# 프로젝트 컨텍스트

기준일: 2026-03-09 (KST)
프로젝트명: Hackerton 운영 포털

## 1) 한 줄 정의
주어진 명세를 구현하는 수준을 넘어, 다음 해커톤에도 재사용 가능한 운영 포털 프로토타입을 docs-first 방식으로 기획하고 증빙하는 워크스페이스.

## 2) 왜 만드는가
- 이 대회는 명세 해석 능력과 전달력이 점수에 직접 연결된다.
- 제출이 `기획서 -> 웹 URL -> PDF`로 단계화되어 있어 문서 운영이 중요하다.
- 심사자는 별도 키 없이 결과를 확인해야 하므로 배포/검수 체크리스트가 필요하다.

## 3) 소스 오브 트루스
- canonical source: `docs/ref/hackathons/daker-handover-2026-03.md`
- 대회 규칙/일정/제출물 참고: `hackathonsjson/public_hackathon_detail.json`
- 팀 모집 상황 참고: `hackathonsjson/public_teams.json`
- 결과물 형태 참고: `hackathonsjson/public_leaderboard.json`

## 4) 핵심 제약
- 예시 자료 외 추가 데이터는 제공되지 않음
- 더미 데이터와 `localStorage` 사용 가능
- 배포 URL은 외부에서 접근 가능해야 하고 심사 기간 동안 유지되어야 함
- 외부 API/DB를 쓰더라도 심사자가 별도 키 없이 확인 가능해야 함

## 5) 산출물 기준
- 기획서 1차 제출: 텍스트 또는 URL
- 최종 제출: 외부 공개 웹 URL + GitHub 링크
- 최종 문서: PDF URL

## 6) 예상 라우트 구조
- `/`: 8비트 랜딩 + 포털 진입
- `/hackathons`: 해커톤 목록
- `/hackathons/:slug`: 해커톤 상세
- `/camp`: 팀 모집/팀 생성
- `/rankings`: 랭킹
- `/war-room/:teamId`: 팀 전용 운영 허브

## 7) 화면 중심 데이터 모델
- `hackathons`
- `teams`
- `teamInvites`
- `warRooms`
- `warRoomChecklist`
- `submissions`
- `leaderboards`
- `rankings`
- 초기 저장 방식은 `localStorage` 우선

## 8) 준비 운영 방식
- `GameLab` 벤치마크 기준으로 `START-HERE`, `master plan`, `status`, `ref`, `logs` 체계를 유지
- 요구사항 해석, 구현 범위 결정, 데모 시나리오를 문서에 먼저 고정
- 개발 과정 자체도 심사 증빙으로 남긴다
