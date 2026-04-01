import {mkdir, mkdtemp, readFile, rm, writeFile} from "node:fs/promises";
import {tmpdir} from "node:os";
import {basename, join, resolve} from "node:path";
import {execFile as execFileCallback} from "node:child_process";
import {promisify} from "node:util";

const execFile = promisify(execFileCallback);

const rootDir = resolve(process.cwd());
const outputDir = join(rootDir, "public", "audio");
const scriptPath = join(rootDir, "src", "data", "script.ko.json");
const durationsPath = join(rootDir, "src", "data", "audio-durations.json");
const timingsPath = join(rootDir, "src", "data", "audio-timings.json");
const baseUrl = process.env.MIMIKA_BASE_URL || "http://127.0.0.1:7693";
const voiceName = process.env.MIMIKA_VOICE_NAME || "jisun-daykervibe";
const primaryEngine = process.env.MIMIKA_ENGINE || "qwen3";
const fallbackEngine = primaryEngine === "qwen3" ? "chatterbox" : "qwen3";
const sentencePauseMs = Math.max(0, Number(process.env.MIMIKA_SENTENCE_PAUSE_MS || "420"));
const sentencePauseSeconds = sentencePauseMs / 1000;

function splitIntoChunks(text) {
  const chunks = text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return chunks.length > 0 ? chunks : [text];
}

async function healthCheck() {
  const res = await fetch(`${baseUrl}/api/health`).catch(() => null);
  if (!res?.ok) {
    throw new Error(`MimikaStudio 서버가 응답하지 않습니다: ${baseUrl}/api/health`);
  }
}

async function generateChunk(engine, text, chunkPath) {
  const endpoint = engine === "qwen3" ? "/api/qwen3/generate" : "/api/chatterbox/generate";
  const payload = engine === "qwen3"
    ? {
        text,
        mode: "clone",
        voice_name: voiceName,
        language: "Korean",
        model_size: "0.6B",
        temperature: 0.3,
        top_p: 0.7,
      }
    : {
        text,
        voice_name: voiceName,
        temperature: 0.8,
      };

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${engine} TTS 실패: ${res.status} ${text}`);
  }

  const json = await res.json();
  if (!json.audio_url) {
    throw new Error(`${engine} 응답에 audio_url이 없습니다.`);
  }

  const audioRes = await fetch(`${baseUrl}${json.audio_url}`);
  if (!audioRes.ok) {
    throw new Error(`오디오 다운로드 실패: ${audioRes.status}`);
  }

  const buffer = Buffer.from(await audioRes.arrayBuffer());
  await writeFile(chunkPath, buffer);
}

async function probeDuration(filePath) {
  const {stdout} = await execFile("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    filePath,
  ]);

  return Number(stdout.trim() || "0");
}

async function createSilenceChunk(outputPath, seconds) {
  await execFile("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    "anullsrc=r=48000:cl=mono",
    "-t",
    seconds.toFixed(3),
    "-c:a",
    "pcm_s16le",
    outputPath,
  ]);
}

async function renderSceneAudio(scene, index) {
  const tempDir = await mkdtemp(join(tmpdir(), `daykervibe-mimika-${scene.id}-`));
  const chunks = splitIntoChunks(scene.voiceover);
  const chunkEntries = [];

  try {
    for (let i = 0; i < chunks.length; i += 1) {
      const chunkPath = join(tempDir, `chunk-${i + 1}.wav`);

      try {
        await generateChunk(primaryEngine, chunks[i], chunkPath);
      } catch (error) {
        console.warn(
          `[scene ${scene.id}] ${primaryEngine} 실패 -> ${fallbackEngine}로 재시도: ${
            error instanceof Error ? error.message : error
          }`,
        );
        await generateChunk(fallbackEngine, chunks[i], chunkPath);
      }

      const seconds = await probeDuration(chunkPath);
      chunkEntries.push({
        path: chunkPath,
        text: chunks[i],
        seconds,
      });
    }

    const concatPaths = [];
    if (sentencePauseSeconds > 0 && chunkEntries.length > 1) {
      const silencePath = join(tempDir, "sentence-pause.wav");
      await createSilenceChunk(silencePath, sentencePauseSeconds);

      for (let i = 0; i < chunkEntries.length; i += 1) {
        concatPaths.push(chunkEntries[i].path);
        if (i < chunkEntries.length - 1) {
          concatPaths.push(silencePath);
        }
      }
    } else {
      concatPaths.push(...chunkEntries.map((entry) => entry.path));
    }

    const concatListPath = join(tempDir, "concat.txt");
    await writeFile(
      concatListPath,
      `${concatPaths.map((filePath) => `file '${filePath.replace(/'/g, "'\\''")}'`).join("\n")}\n`,
      "utf8",
    );

    const outputPath = join(outputDir, `narration-scene-${String(index + 1).padStart(2, "0")}.wav`);
    const tempOutput = join(tempDir, `scene-${index + 1}.wav`);

    await execFile("ffmpeg", [
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      concatListPath,
      "-ar",
      "48000",
      "-ac",
      "1",
      "-filter:a",
      "loudnorm=I=-16:LRA=11:TP=-1.5",
      tempOutput,
    ]);

    await execFile("ffmpeg", ["-y", "-i", tempOutput, "-ar", "48000", "-ac", "1", outputPath]);
    const totalSeconds = await probeDuration(outputPath);
    const segments = [];
    let cursor = 0;

    for (let i = 0; i < chunkEntries.length; i += 1) {
      const start = cursor;
      const end = i === chunkEntries.length - 1
        ? totalSeconds
        : Math.min(totalSeconds, start + chunkEntries[i].seconds);

      segments.push({
        text: chunkEntries[i].text,
        start: Number(start.toFixed(3)),
        end: Number(end.toFixed(3)),
        seconds: Number(chunkEntries[i].seconds.toFixed(3)),
      });

      cursor = end;
      if (i < chunkEntries.length - 1 && sentencePauseSeconds > 0) {
        cursor += sentencePauseSeconds;
      }
    }

    return {
      id: scene.id,
      file: basename(outputPath),
      seconds: totalSeconds,
      pauseSeconds: Number(sentencePauseSeconds.toFixed(3)),
      segments,
    };
  } finally {
    await rm(tempDir, {recursive: true, force: true});
  }
}

async function main() {
  await healthCheck();
  await mkdir(outputDir, {recursive: true});

  const scenes = JSON.parse(await readFile(scriptPath, "utf8"));
  const durations = [];

  for (let index = 0; index < scenes.length; index += 1) {
    const scene = scenes[index];
    const result = await renderSceneAudio(scene, index);
    durations.push(result);
    console.log(
      `${String(index + 1).padStart(2, "0")}. ${scene.id} -> public/audio/${result.file} (${result.seconds.toFixed(2)}s)`,
    );
  }

  const durationMap = Object.fromEntries(
    durations.map((item) => [item.id, Number(item.seconds.toFixed(2))]),
  );
  const timingMap = Object.fromEntries(
    durations.map((item) => [
      item.id,
      {
        totalSeconds: Number(item.seconds.toFixed(3)),
        pauseSeconds: item.pauseSeconds,
        segments: item.segments,
      },
    ]),
  );
  await writeFile(durationsPath, `${JSON.stringify(durationMap, null, 2)}\n`, "utf8");
  await writeFile(timingsPath, `${JSON.stringify(timingMap, null, 2)}\n`, "utf8");

  const total = durations.reduce((sum, item) => sum + item.seconds, 0);
  console.log(`총 Mimika narration 길이: ${total.toFixed(2)}초`);
  console.log(`오디오 길이 메타 저장: ${durationsPath}`);
  console.log(`문장 타이밍 메타 저장: ${timingsPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
