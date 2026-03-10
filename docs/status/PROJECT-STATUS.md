# Project Status

Last Updated: 2026-03-10 (KST)
Focus Hackathon: `daker-handover-2026-03`
Product: `Expedition Hub`

## Current Phase
**Phase 2: QA + 확장 — IN PROGRESS**

## Implementation Progress
| Phase | 상태 | 구현 범위 | 비고 |
|-------|------|-----------|------|
| Phase 0: Scaffold | **완료** | 타입, 스토리지, 시딩, 디자인 토큰, 라우트 골격 | localStorage 기반 구조 고정 |
| Phase 1A: 셸 + 공개 페이지 | **완료** | TopNav, Footer, 상태 UI 3종, `/`, `/hackathons`, `/hackathons/:slug` | 상세 8개 섹션 구현 완료 |
| Phase 1B: 협업 + 팀 페이지 | **완료** | `/camp`, `/rankings`, `/war-room/:teamId` | 작전실 내부 구현과 공개 진입 흐름까지 정합화 완료 |
| Phase 2: QA + 확장 | 진행중 | 반응형, 프라이버시 검증, 디자인 고도화, 제출 자산 정리 | 배포 및 제출 체크리스트 남음 |

## Completed Deliverables
- `src/components/ui/*` — Card, StatusBadge, PixelButton, Loading/Empty/Error 상태 UI
- `src/components/layout/*` — TopNav, Footer, PageShell
- `src/app/page.tsx` — 랜딩, 주요 CTA, featured hackathon, 포털 가치 섹션
- `src/app/hackathons/page.tsx` — 해커톤 목록, 상태 필터, 카드 그리드
- `src/app/hackathons/[slug]/page.tsx` — 요약 바, 섹션 탭, 필수 8개 상세 섹션
- `src/components/hackathon/sections/*` — overview / guide / eval / schedule / prize / teams / submit / leaderboard
- `src/app/camp/page.tsx` — 원정대 모집 필터, 생성 폼, 모집 상태 카드, 작전실 열기 CTA
- `src/app/rankings/page.tsx` — 기간 기반 글로벌 랭킹 테이블
- `src/app/war-room/[teamId]/page.tsx` — 베이스캠프 요약, 단계 관리, 제출 준비 허브
- `src/components/hackathon/sections/TeamsSection.tsx` — 상세 팀 카드와 작전실 이동 CTA
- `src/lib/storage/*`, `src/lib/types/*` — schema 정렬된 로컬 저장 및 시드 구조 유지

## Validation Snapshot
- `npm install` 완료
- `npm run build` 통과
- `npm run lint` 통과 (`eslint.config.mjs` 추가, localStorage hydration 패턴 정리)
- `npm run dev -- --hostname 127.0.0.1 --port 3000`는 기존 `next dev` 인스턴스와 `.next/dev/lock` 점유로 완전 검증 보류

## Canonical Source
- `docs/ref/hackathons/daker-handover-2026-03.md`

## Confirmed Facts
- 개인 참가 가능, 팀 최대 5인
- 제출은 `기획서 -> 웹 URL + GitHub -> PDF` 순서
- 평가 비중은 참가자 30%, 심사위원 70%
- 외부 접속 가능한 배포 URL이 필요
- 심사자 검토에 별도 API 키가 필요하면 불리함
- 전 페이지 공통 상단 이동과 상태 UI 3종이 필요
- 핵심 페이지는 `/hackathons/:slug`
- `teams`는 해커톤과 연결되지 않아도 생성 가능
- 내부 유저 정보, 비공개 정보, 다른 팀 내부 정보는 공개 금지
- 팀 수 `43`, 조회수 `614`, 총상금 `1,000,000원`

## Open Gaps
- 모바일/태블릿 반응형 세부 조정
- `/camp?hackathon=:slug` 쿼리 필터 SSOT 반영
- `private-hidden` 필드 미노출 최종 검증
- 디자인 고도화(호버, 전환, 시각적 리듬)
- Submission 1 기획서 문안 정리
- Vercel 배포 및 제출 체크리스트 확정

## Next Actions
1. `/camp?hackathon=:slug` 쿼리 필터를 구현해 camp 흐름을 SSOT와 맞춘다.
2. 모바일/태블릿에서 `/war-room/:teamId` 중심 반응형 QA를 수행한다.
3. 공개 페이지와 팀 로컬 데이터 경계가 schema/privacy 규칙과 일치하는지 검증한다.
4. Expedition Hub 기준 기획서 초안과 제출 체크리스트를 작성한다.
5. Vercel 배포 후 공개 URL 검수 흐름을 고정한다.

## Recent Decisions
- 제품 서비스명은 `Expedition Hub`
- 공식 안내가 사용자 수기 명세, PNG, 기존 JSON보다 우선
- 베이스캠프는 별도 라우트가 아니라 작전실 상단 상태 요약으로 처리
- 작전실은 팀 전용 협업 공간이 아니라 제출 준비 관리 허브로 해석
- 기술 스택은 `Next.js + TypeScript + Tailwind + localStorage + Vercel`
- 추가 페이지(프로필, 설정 등) 불필요하며 기존 6개 페이지 완성도에 집중한다
- Next.js 16 / ESLint 9 조합에 맞춰 flat config 기준으로 lint 체계를 유지한다
