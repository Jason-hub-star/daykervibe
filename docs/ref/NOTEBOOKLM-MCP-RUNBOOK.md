# NotebookLM MCP Runbook

NotebookLM MCP는 이 프로젝트에서 외부 리서치와 메모 정리를 위한 보조 채널이다.

## Verified Upstream
- npm package: `notebooklm-mcp`
- checked on 2026-03-09
- version: `1.2.1`
- repository: [PleasePrompto/notebooklm-mcp](https://github.com/PleasePrompto/notebooklm-mcp)

## Project Config
- project file: `.mcp.json`
- server name: `notebooklm`
- command: `npx -y notebooklm-mcp@latest`

## Client Install Options
- Codex CLI style: `codex mcp add notebooklm -- npx notebooklm-mcp@latest`
- Generic MCP config:

```json
{
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["-y", "notebooklm-mcp@latest"]
    }
  }
}
```

프로젝트 `.mcp.json`을 클라이언트가 자동으로 읽지 않으면 클라이언트 전역 MCP 설정에도 같은 항목을 넣는다.

## Auth Flow
1. MCP 서버가 보이는지 확인한다.
2. NotebookLM 로그인 도구를 실행한다.
3. 브라우저에서 Google 로그인과 Notebook 공유 접근을 완료한다.
4. 재확인 후 노트를 선택한다.

## Research Flow
1. 노트 개요를 묻는다.
2. 이 해커톤에 필요한 기능, 제약, 데모 포인트를 묻는다.
3. 메모 이미지나 수기 메모와 충돌하는 지점을 확인한다.
4. 답이 부족하면 follow-up 질문을 이어간다.
5. 결과는 `docs/ref/notebooklm/6d0f6dbf-33b0-4f1f-8f32-80a6d7325308.md`에 요약만 저장한다.

## Failure States
- `blocked-auth`: Google 로그인 미완료
- `blocked-sharing`: 공유된 Notebook 접근 권한 없음
- `partial-answer`: 일부만 답변 가능
- `pending-source`: Notebook 본문 자체를 아직 수집하지 못함

## Persistence
- note file: `docs/ref/notebooklm/6d0f6dbf-33b0-4f1f-8f32-80a6d7325308.md`
- run log: `memory/notebooklm-runs.ndjson`
