# Expedition Hub Intro Video

## Commands

```bash
npm install
npm run studio
npm run render
```

## Structure

- `src/data/script.ko.ts` — 씬별 한국어 원고
- `src/data/timeline.ts` — 씬 길이와 still 매핑
- `public/stills/` — 배포 화면 캡처
- `public/audio/` — 씬별 내레이션 wav
- `voice/` — 레퍼런스 음성 보관용

## Voice Plan

- 1순위: 내 목소리 기반 오픈소스 voice cloning TTS
- fallback: 일반 한국어 오픈소스 TTS
- 현재 스캐폴드는 오디오 없이도 렌더 가능하도록 구성되어 있다.
