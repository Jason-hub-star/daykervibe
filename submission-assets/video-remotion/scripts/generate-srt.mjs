import {readFile, writeFile} from "node:fs/promises";
import {join, resolve} from "node:path";

const rootDir = resolve(process.cwd());
const scriptPath = join(rootDir, "src", "data", "script.ko.json");
const durationsPath = join(rootDir, "src", "data", "audio-durations.json");
const timingsPath = join(rootDir, "src", "data", "audio-timings.json");
const outputPath = join(rootDir, "public", "audio", "subtitles-ko.srt");

function splitSentences(text) {
  const parts = text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [text];
}

function formatSrtTime(seconds) {
  const totalMs = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(totalMs / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
  const secs = Math.floor((totalMs % 60_000) / 1000);
  const ms = totalMs % 1000;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

async function main() {
  const scenes = JSON.parse(await readFile(scriptPath, "utf8"));
  const durations = JSON.parse(await readFile(durationsPath, "utf8"));
  let timings = null;

  try {
    timings = JSON.parse(await readFile(timingsPath, "utf8"));
  } catch (error) {
    timings = null;
  }

  let cursor = 0;
  let index = 1;
  const blocks = [];

  for (const scene of scenes) {
    const timingInfo = timings?.[scene.id];
    if (timingInfo?.segments?.length) {
      for (const segment of timingInfo.segments) {
        blocks.push(
          `${index}\n${formatSrtTime(cursor + Number(segment.start || 0))} --> ${formatSrtTime(cursor + Number(segment.end || 0))}\n${segment.text}\n`,
        );
        index += 1;
      }

      cursor += Number(timingInfo.totalSeconds || durations[scene.id] || 0);
      continue;
    }

    const sceneDuration = Number(durations[scene.id] || 0);
    const sentences = splitSentences(scene.voiceover);
    const sentenceDuration = sceneDuration > 0 ? sceneDuration / sentences.length : 0;

    for (let i = 0; i < sentences.length; i += 1) {
      const start = cursor + sentenceDuration * i;
      const end = i === sentences.length - 1 ? cursor + sceneDuration : cursor + sentenceDuration * (i + 1);
      blocks.push(`${index}\n${formatSrtTime(start)} --> ${formatSrtTime(end)}\n${sentences[i]}\n`);
      index += 1;
    }

    cursor += sceneDuration;
  }

  await writeFile(outputPath, `${blocks.join("\n")}\n`, "utf8");
  console.log(`SRT 생성 완료: ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
