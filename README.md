# Hackerton

재사용 가능한 해커톤 운영 포털을 설계하고 구현하기 위한 문서-우선 워크스페이스입니다.

이번 프로젝트는 `daker-handover-2026-03` 해커톤을 첫 사례로 사용하지만, 단건 이벤트 페이지가 아니라 다음 대회에도 재사용 가능한 포털 구조를 목표로 합니다.

## Core Product Definition

- 모집 -> 팀 구성 -> 제출 -> 평가 이해까지 이어지는 해커톤 운영 포털
- 8비트 게이머 감성 랜딩 + 운영 포털 UI
- `Next.js + TypeScript + Tailwind + localStorage + Vercel` 기준 설계

## Source Of Truth

- Canonical SSOT:
  - [`docs/ref/hackathons/daker-handover-2026-03.md`](C:\Users\ezen601\Desktop\Jason\hackerton\docs\ref\hackathons\daker-handover-2026-03.md)

## Key Documents

- PRD:
  - [`docs/Prd.md`](C:\Users\ezen601\Desktop\Jason\hackerton\docs\Prd.md)
- Schema:
  - [`docs/schema.md`](C:\Users\ezen601\Desktop\Jason\hackerton\docs\schema.md)
- Wireframe:
  - [`docs/wireframe.md`](C:\Users\ezen601\Desktop\Jason\hackerton\docs\wireframe.md)
- Architecture:
  - [`docs/architecture-diagrams.md`](C:\Users\ezen601\Desktop\Jason\hackerton\docs\architecture-diagrams.md)
- Master plan:
  - [`ai-context/master-plan.md`](C:\Users\ezen601\Desktop\Jason\hackerton\ai-context\master-plan.md)
- Project status:
  - [`docs/status/PROJECT-STATUS.md`](C:\Users\ezen601\Desktop\Jason\hackerton\docs\status\PROJECT-STATUS.md)

## Evidence Assets

- Daily logs:
  - [`docs/daily/2026-03-09/portal-doc-system-bootstrap.md`](C:\Users\ezen601\Desktop\Jason\hackerton\docs\daily\2026-03-09\portal-doc-system-bootstrap.md)
- Integrity report:
  - [`docs/status/INTEGRITY-REPORT.md`](C:\Users\ezen601\Desktop\Jason\hackerton\docs\status\INTEGRITY-REPORT.md)
- Automation health:
  - [`docs/status/AUTOMATION-HEALTH.md`](C:\Users\ezen601\Desktop\Jason\hackerton\docs\status\AUTOMATION-HEALTH.md)

## Planned Routes

- `/`
- `/hackathons`
- `/hackathons/:slug`
- `/camp`
- `/rankings`
- `/war-room/:teamId`

## Design Reference

- 8비트 레퍼런스:
  - [`public/design_reference/1.png`](C:\Users\ezen601\Desktop\Jason\hackerton\public\design_reference\1.png)

## Notes

- NotebookLM 기반 리서치는 이미 프로젝트 문서에 흡수된 상태로 간주합니다.
- 자동화 프롬프트는 제품 기능이 아니라 문서 정합성과 개발 운영 증빙을 위한 자산입니다.
