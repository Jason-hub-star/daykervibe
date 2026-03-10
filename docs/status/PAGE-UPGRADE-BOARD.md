# Page Upgrade Board

Source of truth for route-level execution status.

| route | label | group | priority | status | must_read_docs | note |
|---|---|---|---|---|---|---|
| `/` | Home Landing | Marketing | P0 | Done | `docs/Prd.md`, `docs/wireframe.md` | 8비트 랜딩 + 포털 진입 구현 완료 |
| `/hackathons` | Hackathon List | Portal | P0 | Done | `docs/Prd.md`, `docs/schema.md` | 상태 필터 포함 멀티 해커톤 목록 구현 완료 |
| `/hackathons/:slug` | Hackathon Detail | Portal | P0 | Done | `docs/ref/hackathons/daker-handover-2026-03.md`, `docs/wireframe.md` | 필수 8개 섹션 구현 완료 |
| `/camp` | Team Camp | Collaboration | P0 | Done | `docs/schema.md`, `docs/wireframe.md` | 팀 모집 허브와 생성 폼 구현 완료 |
| `/rankings` | Rankings | Portal | P1 | Done | `docs/schema.md` | 글로벌 랭킹 기본형 구현 완료 |
| `/war-room/:teamId` | War Room | Collaboration | P0 | Done | `docs/Prd.md`, `docs/architecture-diagrams.md` | 베이스캠프 + 제출 준비 관리 허브 구현 완료 |

## Status Flow
`Ready -> InProgress -> QA -> Done` (`Hold` for blocked work)
