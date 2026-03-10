# UI Polish: Dark Card, Filter, Typography — 2026-03-10

## 변경 요약

### Camp 필터 UI 개선
- 모바일(`< sm`): `<select>` 드롭다운으로 전환 (긴 해커톤 타이틀 대응)
- 데스크톱(`≥ sm`): 버튼 행 유지 + `truncate max-w-[180px]`

### Card 다크 variant 도입
- `src/components/ui/Card.tsx`에 `variant="dark"` 추가
- 배경: `--color-dark-card: #252025` (globals.css에 추가)
- 테두리: `accent-orange/30`
- 텍스트: `card-white` 계열

### 다크 카드 적용 대상
| 위치 | 대상 |
|---|---|
| `/camp` | TeamCard (모집 카드) |
| `/camp` | NEW EXPEDITION 폼 (input/select/textarea 포함) |
| `/war-room/:teamId` | BASECAMP 카드 |

### 해커톤 카드 컴팩트화 (`/hackathons`)
- `lg:grid-cols-3` 추가
- 썸네일 `max-h-[160px]`
- 카드 패딩 `p-4` → `p-3`

### 배너 이미지 축소 (`/hackathons/:slug`)
- 데스크톱: `lg:w-3/5 lg:mx-auto`

### 텍스트 가독성 강화
- Camp 해커톤 태그: `font-pixel text-[8px]` → `font-dunggeunmo text-xs font-bold`
- War Room 워크플로 컬럼 제목: `font-pixel text-[8px]` → `font-dunggeunmo text-sm font-bold`
- War Room 제출 단계 버튼/뱃지: `font-pixel text-[8px~9px]` → `font-dunggeunmo text-sm font-bold`

## 수정 파일
- `src/app/globals.css`
- `src/components/ui/Card.tsx`
- `src/app/camp/page.tsx`
- `src/app/hackathons/page.tsx`
- `src/app/hackathons/[slug]/page.tsx`
- `src/app/war-room/[teamId]/page.tsx`

## 검증
- `npm run lint` passed
- `npm run build` passed
