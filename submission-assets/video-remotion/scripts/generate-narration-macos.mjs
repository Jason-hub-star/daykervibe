import {mkdir, readFile, rm, writeFile} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join, resolve} from "node:path";
import {execFile as execFileCallback} from "node:child_process";
import {promisify} from "node:util";

const execFile = promisify(execFileCallback);

const voice = process.env.TTS_VOICE || "Yuna";
const rate = process.env.TTS_RATE || "180";
const rootDir = resolve(process.cwd());
const scriptPath = join(rootDir, "src", "data", "script.ko.json");
const durationsPath = join(rootDir, "src", "data", "audio-durations.json");
const timingsPath = join(rootDir, "src", "data", "audio-timings.json");
const outputDir = join(rootDir, "public", "audio");
const tempDir = join(tmpdir(), "expedition-hub-remotion-tts");
const sentencePauseMs = Math.max(0, Number(process.env.TTS_SENTENCE_PAUSE_MS || "420"));
const sentencePauseSeconds = sentencePauseMs / 1000;

function splitIntoChunks(text) {
  const chunks = text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return chunks.length > 0 ? chunks : [text];
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

async function ensureMacTools() {
  try {
    await execFile("say", ["-v", voice, "테스트입니다."]);
  } catch (error) {
    throw new Error(`macOS say 음성 "${voice}"를 사용할 수 없습니다. TTS_VOICE를 확인하세요.`);
  }

  try {
    await execFile("ffmpeg", ["-version"]);
  } catch (error) {
    throw new Error("ffmpeg를 찾을 수 없습니다. Homebrew 등으로 ffmpeg를 설치한 뒤 다시 실행하세요.");
  }
}

async function readScenes() {
  const raw = await readFile(scriptPath, "utf8");
  return JSON.parse(raw);
}

async function synthesizeScene(scene, index) {
  const order = String(index + 1).padStart(2, "0");
  const outputWav = join(outputDir, `narration-scene-${order}.wav`);
  const chunks = splitIntoChunks(scene.voiceover);
  const chunkEntries = [];

  for (let i = 0; i < chunks.length; i += 1) {
    const tempAiff = join(tempDir, `narration-scene-${order}-chunk-${i + 1}.aiff`);
    const tempWav = join(tempDir, `narration-scene-${order}-chunk-${i + 1}.wav`);
    await execFile("say", ["-v", voice, "-r", rate, "-o", tempAiff, chunks[i]]);
    await execFile("ffmpeg", ["-y", "-i", tempAiff, "-ac", "1", "-ar", "48000", tempWav]);
    const seconds = await probeDuration(tempWav);
    chunkEntries.push({
      path: tempWav,
      text: chunks[i],
      seconds,
    });
  }

  const concatEntries = [];
  if (sentencePauseSeconds > 0 && chunkEntries.length > 1) {
    const silencePath = join(tempDir, `narration-scene-${order}-pause.wav`);
    await createSilenceChunk(silencePath, sentencePauseSeconds);

    for (let i = 0; i < chunkEntries.length; i += 1) {
      concatEntries.push(chunkEntries[i].path);
      if (i < chunkEntries.length - 1) {
        concatEntries.push(silencePath);
      }
    }
  } else {
    concatEntries.push(...chunkEntries.map((entry) => entry.path));
  }

  const concatListPath = join(tempDir, `narration-scene-${order}-concat.txt`);
  await writeFile(
    concatListPath,
    `${concatEntries.map((filePath) => `file '${filePath.replace(/'/g, "'\\''")}'`).join("\n")}\n`,
    "utf8",
  );

  const tempMixed = join(tempDir, `narration-scene-${order}-mixed.wav`);
  await execFile("ffmpeg", [
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    concatListPath,
    "-ac",
    "1",
    "-ar",
    "48000",
    tempMixed,
  ]);
  await execFile("ffmpeg", ["-y", "-i", tempMixed, "-ac", "1", "-ar", "48000", outputWav]);
  const totalSeconds = await probeDuration(outputWav);

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
    file: `public/audio/narration-scene-${order}.wav`,
    seconds: totalSeconds,
    pauseSeconds: Number(sentencePauseSeconds.toFixed(3)),
    segments,
  };
}

async function main() {
  await ensureMacTools();
  await mkdir(outputDir, {recursive: true});
  await mkdir(tempDir, {recursive: true});

  const scenes = await readScenes();
  const durations = [];

  for (let index = 0; index < scenes.length; index += 1) {
    const scene = scenes[index];
    const result = await synthesizeScene(scene, index);
    durations.push(result);
    console.log(
      `${String(index + 1).padStart(2, "0")}. ${scene.id} -> ${result.file} (${result.seconds.toFixed(2)}s)`,
    );
  }

  const totalSeconds = durations.reduce((sum, item) => sum + item.seconds, 0);
  const durationMap = Object.fromEntries(durations.map((item) => [item.id, Number(item.seconds.toFixed(2))]));
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
  console.log(`총 내레이션 길이: ${totalSeconds.toFixed(2)}초`);
  console.log(`오디오 길이 메타 저장: src/data/audio-durations.json`);
  console.log(`문장 타이밍 메타 저장: src/data/audio-timings.json`);

  await rm(tempDir, {recursive: true, force: true});
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
