export interface IntroSceneScript {
  id: string;
  title: string;
  kicker: string;
  body: string;
  caption: string[];
}

export const introScriptKo: IntroSceneScript[] = [
  {
    id: 'opening',
    title: 'Expedition Hub',
    kicker: '재사용형 해커톤 실행 포털',
    body: '원정대 구성부터 제출 준비 관리, 결과 확인까지 하나의 흐름으로 연결했습니다.',
    caption: ['Expedition Hub', '원정대 구성부터 결과 확인까지'],
  },
  {
    id: 'problem',
    title: '왜 만들었나',
    kicker: '흩어진 경험을 한 흐름으로',
    body: '대회 정보 확인, 원정대 구성, 제출 준비 관리, 결과 확인이 분리되면 참가자도 심사자도 전체 구조를 이해하기 어렵습니다.',
    caption: ['문제 정의', '흩어진 실행 흐름'],
  },
  {
    id: 'discover',
    title: '해커톤 탐색',
    kicker: '목록과 필터',
    body: '목록에서는 upcoming 우선 정렬과 태그 기반 탐색으로 참가자가 대회를 빠르게 찾을 수 있습니다.',
    caption: ['탐색', '목록과 필터 흐름'],
  },
  {
    id: 'detail',
    title: '상세 이해',
    kicker: '필수 8개 섹션',
    body: '상세 페이지는 규칙, 일정, 평가, 팀, 제출, 리더보드를 한 맥락 안에서 보여줍니다.',
    caption: ['상세 페이지', '8개 필수 섹션'],
  },
  {
    id: 'camp',
    title: '원정대 구성',
    kicker: 'Camp',
    body: 'Camp에서는 원정대를 새로 만들고 모집 역할을 고르며, 해커톤 기준으로 팀을 찾을 수 있습니다.',
    caption: ['Camp', '원정대 생성과 역할 구성'],
  },
  {
    id: 'war-room',
    title: '제출 준비 허브',
    kicker: 'War Room',
    body: 'War Room은 베이스캠프 요약과 단계 관리, 카드 보드, 체크리스트, 링크 관리를 통해 원정대의 제출 준비를 관리합니다.',
    caption: ['War Room', '원정대 제출 준비 관리'],
  },
  {
    id: 'result',
    title: '결과 이해',
    kicker: '랭킹과 제출 구조',
    body: '제출 준비 흐름이 끝난 뒤에는 랭킹과 결과 맥락까지 같은 서비스 안에서 이어서 확인할 수 있습니다.',
    caption: ['결과 확인', '랭킹과 검수 흐름'],
  },
  {
    id: 'ending',
    title: '배포 URL로 바로 검수',
    kicker: 'Vercel + GitHub',
    body: '심사자는 별도 키 없이 배포 URL과 저장소 링크만으로 서비스 구조를 검수할 수 있고, 자동화된 코드 리뷰와 문서 정합성 점검 흐름으로 품질 관리 방향까지 함께 확인할 수 있습니다.',
    caption: ['daykervibe.vercel.app', '자동화 기반 품질 검수 흐름'],
  },
];
