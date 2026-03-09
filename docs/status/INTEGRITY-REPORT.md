# Integrity Report

Last Run: 2026-03-09 18:00 KST (bootstrap)
Result: pass (manual bootstrap)

## Summary
- SSOT present: yes
- PRD present: yes
- Schema present: yes
- Wireframe present: yes
- Architecture present: yes
- CLAUDE orchestration present: yes
- Automation prompts present: pending bootstrap
- Daily evidence structure present: yes

## Route Coverage
- `/`: documented
- `/hackathons`: documented
- `/hackathons/:slug`: documented
- `/camp`: documented
- `/rankings`: documented
- `/war-room/:teamId`: documented

## Risk Notes
- 실제 구현 코드가 아직 없으므로 문서-코드 정합성 검사는 후속 단계
- 자동화 프롬프트는 생성 후 첫 실행 전까지 `MISSING`으로 볼 수 있음
