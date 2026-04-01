# Expedition Hub Longform Video

해커톤 제출용 유튜브 롱폼 영상을 만들기 위한 Remotion 프로젝트다.

## 목표

- 서비스 가치가 2분 안팎의 흐름으로 바로 보일 것
- SSOT와 심사 기준이 영상 대본에 반영될 것
- macOS 기본 한국어 TTS만으로도 내레이션이 자동 생성될 것
- 기본값은 `private` 또는 `unlisted` 업로드 전 검수 가능한 상태로 유지할 것

## Commands

```bash
npm install
npm run studio
npm run compositions
npm run render
npm run voice:sync
npm run tts:mimika
npm run tts:mac
npm run srt:ko
npm run render:with-audio
```

## Pipeline

1. `script lock`
   - `src/data/script.ko.json`에서 씬별 메시지, 심사 포인트, 내레이션을 고정한다.
2. `still prep`
   - `public/stills/`에 대표 화면 캡처를 배치한다.
3. `reference voice sync`
   - `npm run voice:sync -- "/absolute/path/to/reference.mp3"`로 클론 기준 음성을 `voice/reference.wav`와 MimikaStudio 보이스 샘플에 동기화한다.
4. `narration`
   - 자연스러운 제출본은 `npm run tts:mimika`
   - 빠른 점검용 fallback은 `npm run tts:mac`
5. `subtitles`
   - `npm run srt:ko`로 YouTube 업로드용 SRT를 생성한다.
6. `render`
   - 무음 확인은 `npm run render`
   - 내레이션 포함 최종본은 `npm run render:with-audio`
7. `finish + upload`
   - 필요하면 CapCut으로 자막/리듬만 가볍게 다듬고 YouTube에 비공개 업로드한다.

## Structure

- `src/data/script.ko.json` — 롱폼 장면 SSOT
- `src/data/script.ko.ts` — 타입이 적용된 스크립트 export
- `src/data/timeline.ts` — 씬 길이와 still 매핑
- `src/scenes/SceneCard.tsx` — 장면 공통 레이아웃
- `public/stills/` — 대표 화면 캡처
- `public/audio/` — 장면별 한국어 내레이션 WAV
- `scripts/generate-narration-macos.mjs` — macOS `say` 기반 TTS 생성기
- `scripts/sync-reference-voice.mjs` — reference mp3/wav -> MimikaStudio 보이스 샘플 동기화
- `scripts/generate-narration-mimika.mjs` — MimikaStudio 기반 scene narration 생성기
- `scripts/generate-srt.mjs` — 장면 대본 기반 한국어 SRT 생성기

## Notes

- 오디오 파일은 `.gitignore`에 포함되어 있어 저장소를 가볍게 유지한다.
- 기본 렌더는 오디오 없이도 동작한다.
- 제출용 YouTube 워크플로는 루트의 `docs/submission/youtube-longform-production.md`를 따른다.
