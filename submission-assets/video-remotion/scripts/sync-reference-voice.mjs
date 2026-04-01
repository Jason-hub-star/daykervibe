import {mkdir, readFile, writeFile} from "node:fs/promises";
import {basename, join, resolve} from "node:path";
import {execFile as execFileCallback} from "node:child_process";
import {promisify} from "node:util";

const execFile = promisify(execFileCallback);

const rootDir = resolve(process.cwd());
const voiceDir = join(rootDir, "voice");
const defaultOutput = join(voiceDir, "reference.wav");
const defaultSource = "/Users/family/Downloads/김지선 내레이션 노말.mp3";
const sourcePath = process.argv[2] || process.env.MIMIKA_REFERENCE_SRC || defaultSource;
const outputPath = process.env.MIMIKA_REFERENCE_WAV || defaultOutput;
const baseUrl = process.env.MIMIKA_BASE_URL || "http://127.0.0.1:7693";
const voiceName = process.env.MIMIKA_VOICE_NAME || "jisun-daykervibe";

async function ensureTool(name, args = ["-version"]) {
  try {
    await execFile(name, args);
  } catch (error) {
    throw new Error(`${name}를 찾을 수 없습니다. 설치 상태를 확인해주세요.`);
  }
}

async function convertReferenceToWav() {
  await mkdir(voiceDir, {recursive: true});
  await execFile("ffmpeg", [
    "-y",
    "-i",
    sourcePath,
    "-ac",
    "1",
    "-ar",
    "24000",
    outputPath,
  ]);
}

async function deleteVoice(endpoint) {
  const res = await fetch(`${baseUrl}${endpoint}/${voiceName}`, {method: "DELETE"});
  if (!res.ok && res.status !== 404) {
    const text = await res.text().catch(() => "");
    throw new Error(`기존 보이스 삭제 실패 (${endpoint}): ${res.status} ${text}`);
  }
}

async function uploadVoice(endpoint, transcript = "") {
  const buffer = await readFile(outputPath);
  const form = new FormData();
  form.set("name", voiceName);
  if (transcript) {
    form.set("transcript", transcript);
  }
  form.set("file", new Blob([buffer], {type: "audio/wav"}), basename(outputPath));

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 409 && text.includes("already exists")) {
      return {message: "already exists"};
    }
    throw new Error(`보이스 업로드 실패 (${endpoint}): ${res.status} ${text}`);
  }

  return res.json();
}

async function main() {
  await ensureTool("ffmpeg");

  const health = await fetch(`${baseUrl}/api/health`).then((res) => res.ok).catch(() => false);
  if (!health) {
    throw new Error(`MimikaStudio 서버가 응답하지 않습니다: ${baseUrl}/api/health`);
  }

  await convertReferenceToWav();

  await deleteVoice("/api/chatterbox/voices");
  await deleteVoice("/api/qwen3/voices");

  await uploadVoice("/api/chatterbox/voices");
  await uploadVoice("/api/qwen3/voices", "한국어 여성 내레이션 레퍼런스 음성");

  const metadataPath = join(voiceDir, "reference-meta.json");
  await writeFile(
    metadataPath,
    `${JSON.stringify(
      {
        sourcePath,
        wavPath: outputPath,
        voiceName,
        uploadedAt: new Date().toISOString(),
        baseUrl,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(`reference wav: ${outputPath}`);
  console.log(`voice name: ${voiceName}`);
  console.log(`preview (qwen3): ${baseUrl}/api/qwen3/voices/${voiceName}/audio`);
  console.log(`preview (chatterbox): ${baseUrl}/api/chatterbox/voices/${voiceName}/audio`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
