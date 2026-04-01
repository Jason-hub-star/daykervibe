# 2026-04-01 - README Refresh and Longform Video Pipeline

## Summary

- 루트 `README.md`를 한글 중심 제출형 README로 전면 재작성했다.
- 심사자가 저장소 첫 화면만 보고도 제품 정의, 심사 포인트 대응, 검수 동선, 제출 자산을 바로 파악할 수 있게 구조를 바꿨다.
- `submission-assets/video-remotion/`를 소개 영상 스캐폴드에서 제출용 롱폼 영상 프로젝트로 확장했다.
- macOS 기본 한국어 TTS를 이용해 씬별 내레이션 WAV를 자동 생성하는 스크립트를 추가했다.
- 주인님이 제공한 레퍼런스 음성으로 MimikaStudio voice clone을 동기화하고 씬별 내레이션을 다시 생성했다.
- YouTube 업로드용 `subtitles-ko.srt`를 추가로 생성해 번인 자막과 별도 CC 자막 둘 다 대응할 수 있게 했다.
- 문장 끝과 다음 문장 사이에 `0.42초` 무음 텀을 자동 삽입해 내레이션 호흡을 더 자연스럽게 조정했다.
- `vibehub-media` 비디오 파이프라인의 핵심 개념을 제출 자산 제작 방식으로 재해석한 운영 문서를 추가했다.
- 씬별 사진 사용 계획과 하단 자막 세이프존 규칙을 문서와 Remotion 레이아웃에 반영했다.
- MimikaStudio 내레이션 기준 narrated render까지 실제 산출해 `out/expedition-hub-longform-with-audio.mp4` 파일 생성과 길이를 확인했다.

## Why

- 기존 README는 영어 중심 요약이어서 현재 제출 단계에서 심사 친화성이 약했다.
- 영상 자산은 이미 스캐폴드가 있었지만, 실제 제출용 롱폼 영상 제작 흐름과 자동화 진입점이 부족했다.
- 저장소 진입, PDF/PPTX 제출 자산, Remotion 영상 자산의 메시지를 하나로 묶을 필요가 있었다.

## Changes

- `README.md`
  - 한글 헤드라인, 배포 링크, SSOT 링크, 제출 영상 링크 추가
  - 심사 포인트 대응 표, 검수 동선, 화면 미리보기, 제출 자산 섹션 추가
  - 해커톤 제출형 메시지에 맞춰 전체 톤을 재정렬
- `submission-assets/video-remotion/src/data/script.ko.json`
  - 롱폼 영상용 11개 씬 대본, 하이라이트, 심사 포인트, 내레이션 문구 정리
- `submission-assets/video-remotion/src/scenes/SceneCard.tsx`
  - 제출 영상에 맞는 시각 정보 카드, 하이라이트 칩, 진행 바, route/evidence 배지 추가
  - 하단 중앙 자막 박스와 세이프존 배치 추가
- `submission-assets/video-remotion/src/compositions/ExpeditionHubIntro.tsx`
  - `ExpeditionHubLongform` 구성으로 변경
  - 선택적 내레이션 오디오 렌더 지원 추가
- `submission-assets/video-remotion/src/data/audio-durations.json`
  - 장면별 narration 길이 메타 저장
- `submission-assets/video-remotion/src/data/timeline.ts`
  - 오디오 길이에 맞춰 scene duration을 자동 확장하도록 변경
- `submission-assets/video-remotion/package.json`
  - `tts:mac`, `tts:mimika`, `voice:sync`, `srt:ko`, `render:with-audio` 스크립트 추가
- `submission-assets/video-remotion/scripts/generate-narration-macos.mjs`
  - macOS `say` + `ffmpeg` 기반 장면별 WAV 생성 자동화 추가
  - `audio-durations.json` 자동 갱신 추가
- `submission-assets/video-remotion/scripts/sync-reference-voice.mjs`
  - 외부 MP3/WAV 레퍼런스를 `voice/reference.wav`로 정규화하고 MimikaStudio voice registry에 업로드하는 자동화 추가
- `submission-assets/video-remotion/scripts/generate-narration-mimika.mjs`
  - MimikaStudio `qwen3`/`chatterbox` 엔진을 사용해 scene별 narration WAV를 자동 생성하도록 추가
- `submission-assets/video-remotion/scripts/generate-srt.mjs`
  - narration 길이와 스크립트 기준으로 `public/audio/subtitles-ko.srt`를 생성하도록 추가
  - scene별 실제 문장 타이밍 메타를 읽어 SRT가 문장 사이 무음 텀까지 반영하도록 보정
- `submission-assets/video-remotion/src/data/audio-timings.json`
  - scene별 문장 시작/종료 시각과 pause 길이를 기록하는 메타 파일 추가
- `docs/submission/youtube-longform-production.md`
  - `vibehub-media` 참고 파이프라인을 현재 저장소 제출 영상 흐름으로 재해석한 운영 문서 추가
- `docs/submission/video-scene-plan.md`
  - 씬별 still, 크롭 포인트, 자막 위치를 고정하는 운영 문서 추가

## Validation

- `submission-assets/video-remotion`: `npm run compositions`
- `submission-assets/video-remotion`: `npm run tts:mac`
- `submission-assets/video-remotion`: `npm run voice:sync -- '/Users/family/Downloads/김지선 내레이션 노말.mp3'`
- `submission-assets/video-remotion`: `npm run tts:mimika`
- `submission-assets/video-remotion`: `npm run srt:ko`
- `submission-assets/video-remotion`: `npm run render:with-audio`
- `submission-assets/video-remotion/out/expedition-hub-longform-with-audio.mp4`
  - duration: `212.330667s`
  - size: `33594887 bytes`

## Notes

- 오디오 파일과 렌더 산출물은 `.gitignore`로 관리해 저장소를 가볍게 유지했다.
- 레퍼런스 음성은 `/Users/family/Downloads/김지선 내레이션 노말.mp3`를 사용했고, 로컬 표준화본은 `submission-assets/video-remotion/voice/reference.wav`로 관리한다.
- 현재 Mimika narration 기본 문장 pause는 `0.42초`이며, 필요하면 환경 변수로 더 늘리거나 줄일 수 있다.
- README, PDF, 영상의 핵심 메시지를 `원정대 구성 -> 제출 준비 관리 -> 결과 이해` 서사로 다시 맞췄다.
- 다음 제출 단계에서는 YouTube private 업로드, 설명란/썸네일 정리, 필요 시 CapCut 후보정만 이어서 진행하면 된다.
