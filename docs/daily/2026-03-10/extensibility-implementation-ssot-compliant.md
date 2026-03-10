# 확장성 개선 구현 (SSOT 준수) — 2026-03-10

## 배경
`docs/evidence/extensibility-analysis-2026-03-10.md`에서 도출한 7개 개선 항목 중 SSOT를 위반하지 않는 5개를 구현.

## 구현 완료 (5개)

### 1. 포맷 유틸 중앙화
- `src/lib/format.ts` 생성
- 6개 파일에 분산된 중복 함수 제거 및 import 교체
- 함수: `formatPrize`, `formatDateTime`, `formatDate`, `dDay`, `formatKRW`, `formatPoints`
- 후속: `formatDatetime`/`formatDateTime` 중복 통합 (`a4fa197`)

### 2. TeamCard 통합
- `src/components/ui/TeamCard.tsx` 생성
- camp variant / detail variant 지원
- `camp/page.tsx`와 `TeamsSection.tsx`의 인라인 팀 카드 제거

### 3. Modal 컴포넌트
- `src/components/ui/Modal.tsx` 생성
- ESC 키 닫기, 오버레이 클릭 닫기
- 8비트 디자인 토큰 적용

### 4. Ended 가드 검증
- TeamsSection + SubmitSection에서 이미 Wireframe Addendum 요구사항 충족 확인
- 추가 구현 불필요

### 5. 역할 칩
- War Room에 TEAM MEMBERS 섹션 추가
- `roleLabel` 칩 표시
- team-local only — 공개 라우트에 노출 없음

## SSOT 위반으로 제외 (2개)

| 항목 | 제외 사유 |
|---|---|
| 팀 삭제 | Wireframe/Handover가 "수정, 모집 마감 처리"만 명시 |
| 랭킹 모달 | Schema에 추가 데이터 없음, Wireframe은 테이블 형식만 명시 |

## 커밋
- `e70830f` — feat: extensibility improvements (SSOT-compliant 5 items)
- `a4fa197` — fix: merge duplicate formatDatetime into formatDateTime
- `ac2a834` — chore: update package-lock.json after dependency install

## 변경 규모
- 12개 파일, +335줄 / -218줄
