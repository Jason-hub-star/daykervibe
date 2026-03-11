# automations/

Hackerton automation prompt index for deterministic documentation and evidence maintenance.

## Principles
- Keep every automation deterministic and idempotent.
- Use SSOT as the first comparison target.
- Default to `DRY_RUN=true`.
- Automations maintain docs and evidence, not product code.

## Prompt Files
| File | Purpose | Schedule |
|---|---|---|
| `docs-nightly-organizer.prompt.md` | Organize daily logs and archive candidate notes. | 평일 14:30 KST |
| `code-doc-align.prompt.md` | Check SSOT, PRD, status, and route plan drift. | 평일 10:30 KST |
| `architecture-diagrams-sync.prompt.md` | Check architecture diagram coverage against SSOT and wireframe. | 평일 11:00 KST |
| `automation-health-monitor.prompt.md` | Summarize automation health and lock status. | 평일 11:30 KST |
