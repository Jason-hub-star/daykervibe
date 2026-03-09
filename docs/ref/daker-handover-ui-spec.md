# Daker Handover UI Spec

이 문서는 [`docs/ref/hackathons/daker-handover-2026-03.md`](C:\Users\ezen601\Desktop\Jason\hackerton\docs\ref\hackathons\daker-handover-2026-03.md)의 `Product Spec`을 구현 관점으로 재정렬한 파생 문서다.
값 충돌 시 SSOT가 우선한다.

## Required Screens
- `/`
- `/hackathons`
- `/hackathons/:slug`
- `/camp`
- `/rankings`

## Required Global UI
- 상단바:
  - `메인`
  - `/hackathons`
  - `/camp`
  - `/rankings`
- 상태 UI 3종:
  - `로딩중...`
  - `데이터 없음`
  - `에러`

## Required Page Behavior
### `/`
- 큰 카드 또는 버튼 3개
- `/hackathons`, `/camp`, `/rankings` 진입

### `/hackathons`
- 제목, 상태, 태그, 시작일, 종료일, 참가자수 노출
- 카드 클릭 시 상세 이동

### `/hackathons/:slug`
- 필수 섹션:
  - 개요
  - 안내
  - 평가
  - 일정
  - 상금
  - 팀
  - 제출
  - 리더보드

### `/camp`
- 해커톤 연결 없이도 팀 생성 가능
- `/camp?hackathon=:slug` 필터 지원
- 생성, 수정, 모집 마감 처리 지원

### `/rankings`
- `rank`, `닉네임`, `points`

## Data Contracts
- `hackathons`
- `teams`
- `submissions`
- `leaderboards`
- 저장 방식: `localStorage`

## Required Details
### Teams
- 팀명
- 소개
- 모집중 여부
- 모집 포지션
- 연락 링크

### Submit
- 제출 가이드
- 최소 제출 폼
- `notes` optional
- 공식 제출 구조는 `기획서(text/url)`, `웹 URL + GitHub`, `PDF`

### Leaderboard
- 점수 기준 설명
- 제출 내역 없는 참가자는 `미제출`

## Optional Enhancements
- 상태 필터
- 태그 필터
- 기간 필터
- 팀 초대/수락/거절
- 유의사항 팝업
- 채팅/쪽지
- 디자인 고도화

## Privacy Guard
- 내부 유저 정보 비노출
- 비공개 정보 비노출
- 다른 팀 내부 정보 비노출
- 비공개 연락 수단 비노출
- 지원자 내부 메모 비노출

## Acceptance Checklist
- 모든 상단바 링크 동작
- 모든 주요 페이지에 상태 UI 3종 표시 가능
- 상세 페이지 필수 섹션 렌더링
- 캠프 생성/수정/마감 동작
- 제출 없는 참가자 `미제출` 표기
