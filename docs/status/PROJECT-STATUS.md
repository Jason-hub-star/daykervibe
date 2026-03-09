# Project Status

Last Updated: 2026-03-09 (KST)
Focus Hackathon: `daker-handover-2026-03`

## Current Phase
**Phase 0: Scaffold — COMPLETE**

## Implementation Progress
| Phase | 상태 | 커밋 수 | 비고 |
|-------|------|---------|------|
| Phase 0: Scaffold | **완료** | 7 | 타입, 스토리지, 시딩, 디자인 토큰, 라우트 |
| Phase 1A: 셸 + 공개 페이지 | 미시작 | - | 레이아웃, 랜딩, 목록, 상세 |
| Phase 1B: 협업 + 팀 페이지 | 미시작 | - | 캠프, 랭킹, 작전실 |
| Phase 2: QA + 확장 | 미시작 | - | 반응형, 프라이버시, 확장 |

## Phase 0 완료 산출물
- `src/lib/types/*.ts` — 13개 엔티티 타입 (schema.md 1:1)
- `src/lib/storage/keys.ts` — expeditionHub.* 12개 키 상수
- `src/lib/storage/local-storage.ts` — 타입 안전 get/set/remove
- `src/lib/storage/transformers.ts` — JSON→Entity 변환 (필드 리네이밍, flatten)
- `src/lib/storage/seed.ts` — localStorage 시딩 (__seeded 중복 방지)
- `src/app/globals.css` — 8비트 디자인 토큰 (8색 + 2폰트, Tailwind v4 @theme)
- `src/app/*/page.tsx` — 6개 라우트 placeholder

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
- Submission 1 문안 최종본 미작성
- GitHub 저장소 공개 방식 미확정
- ~~실제 구현용 앱 골격 미생성~~ → Phase 0에서 해결
- 워크플로우 카드 시드 데이터 미작성

## Next Actions
1. **Phase 1A 구현**: 글로벌 레이아웃 (TopNav, Footer) + 3가지 상태 UI
2. **Phase 1A 구현**: `/` 랜딩, `/hackathons` 목록, `/hackathons/:slug` 상세 (8개 섹션)
3. **Phase 1B 구현**: `/camp`, `/rankings`, `/war-room/:teamId`
4. Expedition Hub 기준 기획서 초안 문안 작성
5. 웹 제출 체크리스트 작성

## Recent Decisions
- 제품 서비스명은 `Expedition Hub`
- 공식 안내가 사용자 수기 명세, PNG, 기존 JSON보다 우선
- UI spec과 master plan은 SSOT 파생 문서로 유지
- 베이스캠프는 별도 라우트가 아니라 작전실 상단 상태 요약으로 처리
- 작전실은 팀 전용 협업 공간이 아니라 제출 준비 관리 허브로 해석
- 기술 스택은 `Next.js + TypeScript + Tailwind + localStorage + Vercel`
- 추가 페이지(프로필, 설정 등) 불필요 — 기존 6개 페이지 완성도가 심사 점수에 직결
- thumbnailUrl은 Hackathon 타입에 optional로 추가
- Tailwind v4 CSS-first (@theme) 방식으로 디자인 토큰 관리
