# Expedition Hub YouTube Longform Production

기준일: 2026-04-01 (KST)

이 문서는 `submission-assets/video-remotion/` 기반 해커톤 제출용 롱폼 영상을 만드는 운영 가이드다. 구조는 `/Users/family/jason/vibehub-media`의 비디오 파이프라인에서 핵심 개념만 가져와, 현재 프로젝트의 제출 자산 제작 흐름에 맞게 단순화했다.

## 목표

- 해커톤 심사자가 2분 안팎의 영상으로 서비스 가치와 구조를 이해할 것
- SSOT, 심사 기준, 화면 캡처, 제출 자산 설명이 하나의 스토리로 이어질 것
- 기본 업로드는 `private` 또는 `unlisted`로 진행한 뒤 최종 점검 후 공개 여부를 결정할 것

## vibehub-media 파이프라인에서 가져온 핵심 개념

| vibehub-media 개념 | Expedition Hub 제출 영상에 적용한 방식 |
| --- | --- |
| `raw capture` | 실제 배포 화면 캡처와 필요 시 짧은 화면 녹화 확보 |
| `auto analysis` | 씬별 스크립트 고정, still 구성, TTS 자동 생성 |
| `CapCut finishing` | 자막 미감, 컷 템포, BGM만 마지막 손질 |
| `private upload` | YouTube 비공개 업로드 후 설명/썸네일/오탈자 점검 |

이번 프로젝트에서는 뉴스/쇼츠 자동화처럼 복잡한 DB 파이프라인은 쓰지 않고, 제출 자산 제작에 필요한 최소 자동화만 유지한다.

## 현재 자산 위치

- 대본 SSOT: `submission-assets/video-remotion/src/data/script.ko.json`
- 타임라인: `submission-assets/video-remotion/src/data/timeline.ts`
- still 이미지: `submission-assets/video-remotion/public/stills/`
- 내레이션 출력: `submission-assets/video-remotion/public/audio/`
- Remotion 프로젝트 설명: `submission-assets/video-remotion/README.md`
- 씬별 사진/자막 플랜: `docs/submission/video-scene-plan.md`

## 제작 순서

### 1. 메시지 잠그기

- SSOT 기준으로 아래 메시지가 영상에 모두 들어가야 한다.
  - 재사용 가능한 해커톤 운영 포털
  - `탐색 -> 원정대 구성 -> 제출 준비 관리 -> 결과 이해`
  - 핵심 6개 라우트
  - 상세 8섹션
  - `localStorage` 우선 전략
  - public / team-local 경계
  - 심사자 검수 친화형 흐름

### 2. still 점검

- 현재 기본 still은 아래 경로에 준비돼 있다.
  - `home-1280x800.png`
  - `detail-1280x800.png`
  - `camp-form-1280x800.png`
  - `war-room-drag-desktop-1280.png`
  - `rankings-1280x800.png`
- 더 좋은 캡처가 생기면 같은 경로명을 유지하거나 `timeline.ts`만 갱신한다.

### 3. 한국어 TTS 생성

```bash
cd submission-assets/video-remotion
npm install
npm run voice:sync -- "/Users/family/Downloads/김지선 내레이션 노말.mp3"
npm run tts:mimika
npm run srt:ko
```

- 기본 제출본 경로는 MimikaStudio 클론 음성
- 현재 reference source는 `김지선 내레이션 노말.mp3`
- 기본 voice name은 `jisun-daykervibe`
- 기본 엔진 전략:
  - 1순위: `qwen3` clone, `language="Korean"`
  - fallback: `chatterbox`

빠른 fallback이 필요하면:

```bash
npm run tts:mac
```

- `tts:mac`은 확인용 백업 경로이고, 최종 제출본은 `tts:mimika`를 우선한다.

- 다른 reference 파일을 쓰고 싶으면 경로만 바꿔 실행한다.

```bash
npm run voice:sync -- "/absolute/path/to/another-reference.mp3"
npm run tts:mac
```

### 4. 렌더

무음 레이아웃 점검:

```bash
npm run render
```

내레이션 포함 최종본:

```bash
npm run render:with-audio
```

출력 위치:

- `submission-assets/video-remotion/out/expedition-hub-longform.mp4`
- `submission-assets/video-remotion/out/expedition-hub-longform-with-audio.mp4`

### 5. 마감 편집

- CapCut 또는 동등한 툴에서 아래만 가볍게 손본다.
  - 장면 전환 템포
  - 자막 강조
  - 시작/끝 1초 내외 여백
  - 배경음악 볼륨
- 핵심 메시지나 구조는 Remotion 원본 기준을 유지한다.

### 6. YouTube 업로드

- 기본 공개 범위: `private`
- 제목 예시:
  - `Expedition Hub | 해커톤 원정대 구성부터 제출 준비 관리까지`
- 설명 첫 줄에는 아래 링크를 고정한다.
  - Vercel: `https://daykervibe.vercel.app/`
  - GitHub: `https://github.com/kimjuyoung1127/daykervibe`

## 제출 영상 체크리스트

- [ ] 첫 10초 안에 서비스 한 줄 정의가 보인다
- [ ] SSOT 기준 핵심 6개 라우트가 영상에 반영된다
- [ ] 상세 8섹션과 War Room 차별점이 분명하다
- [ ] 심사 기준 연결이 영상 문구에 반영된다
- [ ] 배포 URL과 GitHub 저장소가 영상 마지막에 노출된다
- [ ] private 또는 unlisted 업로드로 최종 검수했다

## 권장 운영 방식

- README, PDF, 영상의 핵심 메시지는 같은 서사를 유지한다.
- 영상 대본을 먼저 수정하고 나서 TTS를 다시 생성한다.
- 공개 업로드 전에 팀 내부에서 한 번 더 보고 오탈자와 타이밍을 확인한다.
