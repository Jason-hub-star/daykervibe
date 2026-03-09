# Project Status

Last Updated: 2026-03-09 (KST)
Focus Hackathon: `daker-handover-2026-03`

## Current Focus
- SSOT 문서 잠금 완료
- PRD / Schema / Wireframe / Architecture bootstrap 완료
- CLAUDE orchestration bootstrap 완료
- 상태 보드 / 증빙 기록 체계 bootstrap 완료
- automation scaffold bootstrap 완료

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
- 기획서 초안 문안 미작성
- GitHub 저장소 공개 방식 미확정
- 실제 구현용 앱 골격 미생성
- 자동화 첫 실행 전 상태

## Next Actions
1. SSOT 기준으로 기획서 초안 작성
2. 실제 앱 골격 초기화 계획 작성
3. 웹 제출 체크리스트 작성
4. PDF 증빙 섹션 구조 작성

## Recent Decisions
- 단일 진실 소스는 기존 해커톤 요약 문서를 확장해 사용
- 공식 안내가 사용자 수기 명세, PNG, 기존 JSON보다 우선
- UI spec과 master plan은 SSOT 파생 문서로 유지
- 제품은 `재사용 가능한 해커톤 운영 포털`
- 기술 스택은 `Next.js + TypeScript + Tailwind + localStorage + Vercel`
- 작전실은 팀 전용 운영 허브로 해석
