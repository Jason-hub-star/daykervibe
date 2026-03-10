# Project Status

Last Updated: 2026-03-10 (KST)
Focus Hackathon: `daker-handover-2026-03`

## Current Phase
**Phase 1B: 협업 + 팀 페이지 — COMPLETE**

## Implementation Progress
| Phase | 상태 | 커밋 수 | 비고 |
|-------|------|---------|------|
| Phase 0: Scaffold | **완료** | 7 | 타입, 스토리지, 시딩, 디자인 토큰, 라우트 |
| Phase 1A: 셸 + 공개 페이지 | **완료** | 6 | 레이아웃, UI 컴포넌트, 랜딩, 목록, 상세 8섹션 |
| Phase 1B: 협업 + 팀 페이지 | **완료** | 1 | 캠프, 랭킹, 작전실 + 시딩 데이터 |
| Phase 2: QA + 확장 | 미시작 | - | 반응형, 프라이버시, 디자인 고도화 |

## 전체 라우트 구현 현황 (6/6)
| 라우트 | 상태 | 핵심 기능 |
|--------|------|----------|
| `/` | **완료** | Hero, Trending Missions, 포털 가치, CTA |
| `/hackathons` | **완료** | 상태 필터(전체/모집중/진행중/종료), 카드 그리드 |
| `/hackathons/:slug` | **완료** | SummaryBar, SectionTabs, 8개 섹션 |
| `/camp` | **완료** | 해커톤별 필터, 모집중/마감 분류, 원정대 생성 CRUD |
| `/rankings` | **완료** | 기간 필터(7d/30d/all), 포인트 순 랭킹 테이블 |
| `/war-room/:teamId` | **완료** | 베이스캠프 요약, 5단계 스테퍼, 워크플로우 보드, 체크리스트, 팀 메모, 링크 관리 |

## 컴포넌트 구현 현황
### UI 기초 (6/6)
- `Card` — 8비트 카드 (pixel-shadow-hover)
- `StatusBadge` — upcoming/ongoing/ended 배지
- `PixelButton` — primary/secondary/ghost 3종
- `LoadingState` — 블링크 애니메이션
- `EmptyState` — 대시 보더 + 체크리스트 아이콘
- `ErrorState` — 로켓 아이콘 + 재시도 버튼

### 레이아웃 (3/3)
- `TopNav` — 스티키 네비게이션 + 현재 라우트 하이라이트
- `Footer` — 시스템 상태 바
- `PageShell` — max-w 컨테이너 래퍼

### 해커톤 상세 (11/11)
- `SummaryBar` — 상태/D-DAY/팀수/상금
- `SectionTabs` — 8개 탭 네비
- `SectionRenderer` — 섹션 라우터
- `OverviewSection`, `GuideSection`, `EvalSection`, `ScheduleSection`
- `PrizeSection`, `TeamsSection`, `SubmitSection`, `LeaderboardSection`

## 시딩 데이터 현황
| 데이터 | 소스 | 상태 |
|--------|------|------|
| Hackathons | public_hackathons.json + detail | 시딩 완료 |
| Teams | public_teams.json | 시딩 완료 |
| Leaderboard | public_leaderboard.json | 시딩 완료 |
| Rankings | 더미 15건 (all/30d/7d) | 시딩 완료 |
| TeamMembers | 더미 3명 (데모 팀) | 시딩 완료 |
| WarRoom | 더미 1건 (데모 팀) | 시딩 완료 |
| WorkflowCards | 더미 4건 | 시딩 완료 |
| Checklist | 더미 4건 | 시딩 완료 |
| Submissions | 더미 1건 | 시딩 완료 |
| SubmissionArtifacts | 더미 2건 | 시딩 완료 |

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
- ~~워크플로우 카드 시드 데이터 미작성~~ → Phase 1B에서 해결
- 반응형 세부 조정 (모바일 작전실 단일 컬럼 등)
- 디자인 고도화 (애니메이션, 트랜지션)

## Next Actions
1. **Phase 2**: 반응형 세부 조정 (모바일/태블릿)
2. **Phase 2**: private-hidden 필드 미노출 최종 검증
3. **Phase 2**: 디자인 고도화 (호버 애니메이션, 페이지 전환)
4. Expedition Hub 기준 기획서 초안 문안 작성
5. 웹 제출 체크리스트 작성
6. Vercel 배포

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
- 작전실 데모 팀은 T-HANDOVER-01 (404found) 기준으로 시딩
