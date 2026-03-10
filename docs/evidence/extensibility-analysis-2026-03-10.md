# 프로젝트 확장성 분석 및 개선 계획 — 2026-03-10

## Context
프로젝트가 실제 해커톤 운영 웹사이트로 사용 가능하려면 어떤 기능/구조 개선이 필요한지 분석.
현재 Phase 2 QA 단계이며, 기본 6개 라우트와 localStorage 기반 CRUD가 구현된 상태.
SSOT를 위반하지 않으면서 확장 가능한 방향을 설계한다.

---

## 1. Slug 확장성 — ✅ 이미 양호

**현황**: `hackathonsjson/` JSON → `seed.ts` → localStorage → 모든 페이지가 동일 소스 소비
**결론**: 새 JSON 파일에 해커톤을 추가하면 `/hackathons`, `/hackathons/:slug`, `/camp` 필터, 팀 연결 등 모두 자동 전파됨. 하드코딩된 slug 없음.

**개선 불필요** — 현재 패턴 유지.

---

## 2. 원정대(팀) 삭제 기능 — ❌ 미구현 → 추가 필요

**현황**: CREATE만 존재. 삭제/수정 없음.
**문제**: 잘못 만든 팀을 제거할 수 없음.

### 구현 계획
- **파일**: `src/app/camp/page.tsx`, `src/lib/storage/local-storage.ts`
- **방법**: TeamCard에 삭제 버튼 추가 (확인 모달 포함)
- **로직**:
  1. `removeTeam(teamId)` 유틸 함수 작성 → `STORAGE_KEYS.TEAMS`에서 해당 ID 필터링 후 저장
  2. 연관된 `STORAGE_KEYS.WAR_ROOMS` 데이터도 함께 제거
  3. 삭제 전 `confirm()` 또는 커스텀 확인 UI
- **가드**: 삭제는 팀 카드 내부에서만 가능 (공개 상세 페이지에서는 불가)

---

## 3. Closed 팀 작전실 접근 — ✅ 이미 가능, 의도적 유지

**현황**: `war-room/[teamId]/page.tsx`에 `isOpen` 가드 없음. 모집 마감 팀도 작전실 접근 가능.
**결론**: 올바른 설계. 모집을 닫았다고 작전실을 막으면 안 됨 — 팀은 제출 준비를 계속해야 함.

**개선 불필요** — 현재 동작 유지.

---

## 4. Ended 해커톤 원정대 생성 제한 — ⚠️ 가드 추가 필요

**현황**: `/camp` 폼에서 ended 해커톤을 선택해 팀 생성 가능. 하지만 생성 후 해당 해커톤 상세에서 기능이 제한됨.
**문제**: 종료된 해커톤에 팀을 만드는 것은 의미 없고 혼란 유발.

### 구현 계획
- **파일**: `src/app/camp/page.tsx`
- **방법**: 폼 드롭다운에서 ended 해커톤을 필터링하거나 `(종료)` 라벨 + disabled 처리

---

## 5. 모집 역할 선택 UX 개선 — 📝 프리셋 칩 추가

**현황**: 콤마 구분 자유 텍스트 입력. 일관성 부족 가능.

### 구현 계획
- **파일**: `src/app/camp/page.tsx`
- **방법**: 미리 정의된 역할 칩 + 커스텀 입력 병행
- **프리셋 목록**: `Frontend`, `Backend`, `Designer`, `PM`, `AI/ML`, `DevOps`, `기타`

---

## 6. 랭킹 닉네임 클릭 모달 — ❌ 미구현 → 추가 가치 있음

**현황**: 닉네임은 plain text. 클릭 불가.

### 구현 계획
- **타입 확장**: `RankingProfile`에 `bio?`, `team?`, `hackathonSlugs?` 필드 추가
- **컴포넌트**: `RankingProfileModal` 신규 생성 (공용 Modal 기반)

---

## 7. 컴포넌트화 및 구조 개선

| 항목 | 현황 | 계획 |
|---|---|---|
| 공용 Modal | 없음 | `src/components/ui/Modal.tsx` 신규 |
| TeamCard 통합 | camp/detail 별도 구현 | `src/components/team/TeamCard.tsx`로 통합 |
| 포맷 유틸 | 여러 파일에 중복 | `src/lib/formatters.ts`로 중앙화 |
| FormField | input 패턴 반복 | `src/components/ui/FormField.tsx` 래퍼 |

---

## 8. 실제 운영 서비스를 위한 추가 필요 사항

| 영역 | 현재 | 필요 |
|---|---|---|
| **인증** | 없음 (로컬 전용) | 로그인/회원가입 (NextAuth 등) |
| **DB** | localStorage | Supabase/PostgreSQL 등 서버 DB |
| **권한** | 없음 | 팀 소유자만 편집/삭제, 관리자 역할 |
| **실시간** | 없음 | 팀 채팅, 알림 (WebSocket/Supabase Realtime) |
| **파일 업로드** | 없음 | PDF/이미지 업로드 (S3/Supabase Storage) |
| **이메일** | 없음 | 팀 초대, 마감 알림 |
| **SEO** | 기본 | OG 메타, sitemap, SSR 강화 |
| **배포** | 미정 | Vercel + 도메인 연결 |

---

## 실행 우선순위 (SSOT 위반 없이 즉시 구현 가능)

| 순서 | 작업 | 난이도 | 영향도 | 상태 |
|---|---|---|---|---|
| 1 | 공용 Modal 컴포넌트 | 낮음 | 높음 | 다음 구현 예정 |
| 2 | 원정대 삭제 기능 | 중간 | 높음 | 다음 구현 예정 |
| 3 | Ended 해커톤 생성 제한 | 낮음 | 중간 | 다음 구현 예정 |
| 4 | 모집 역할 프리셋 칩 | 중간 | 중간 | 다음 구현 예정 |
| 5 | 랭킹 닉네임 모달 | 중간 | 중간 | 다음 구현 예정 |
| 6 | TeamCard 통합 | 중간 | 구조 개선 | 다음 구현 예정 |
| 7 | 포맷 유틸 중앙화 | 낮음 | 구조 개선 | 다음 구현 예정 |
