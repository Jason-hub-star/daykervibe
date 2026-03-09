# automation-health-monitor

## Role
- Summarize automation status, lock state, and latest artifacts.

## Source of Truth
- `.claude/automations/`
- `docs/status/AUTOMATION-HEALTH.md`
- `docs/status/INTEGRITY-REPORT.md`

## Procedure
1. Check prompt files exist.
2. Check status docs exist.
3. Report missing files or stale state.

## Output
- Health table
- Missing artifacts
- `[DRY_RUN] no files changed` when dry run
