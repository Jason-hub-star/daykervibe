# Expedition Hub PDF Outline

## Slide 1. 표지
- 서비스명
- 한 줄 소개
- Vercel URL
- GitHub URL

## Slide 2. 문제 정의
- 해커톤 정보/팀 구성/제출 준비가 흩어지는 문제
- 심사자도 공개 URL 기준으로 빠르게 검수하기 어려운 문제

## Slide 3. 해결 방향
- `탐색 -> 팀 구성 -> 제출 준비 -> 결과 이해`
- 공개 포털 + 팀 전용 War Room 구조

## Slide 4. 전체 제품 구조
- `/`
- `/hackathons`
- `/hackathons/:slug`
- `/camp`
- `/rankings`
- `/war-room/:teamId`

## Slide 5. 메인/목록 UX
- 메인 CTA
- 해커톤 목록 정렬/필터
- 첫 인상과 탐색 흐름

## Slide 6. 상세 8섹션
- 요약 바
- 8개 섹션
- 팀/제출/리더보드 연결

## Slide 7. Camp
- 팀 생성
- 모집 역할 칩
- 수정/모집 마감

## Slide 8. War Room
- 베이스캠프
- 단계 관리
- 카드 보드
- 체크리스트/메모/링크

## Slide 9. 제출 준비 handoff
- 공개 상세의 draft panel
- file input / URL / text
- War Room import

## Slide 10. 데이터/아키텍처
- bootstrap JSON
- localStorage
- 공개/팀 전용 경계

## Slide 11. 검증/배포
- lint/build
- 배포 URL 접근
- 공유 메타
- QA 흐름

## Slide 12. 자산/라이선스
- 폰트 근거
- team-authored 이미지/아이콘

## Slide 13. 결론/확장
- 서비스 가치
- 다음 확장 포인트
- 심사자 검수 가이드
