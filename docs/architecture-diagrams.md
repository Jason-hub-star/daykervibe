# Hackerton Architecture Diagrams

Hackerton 운영 포털용 Mermaid 다이어그램 모음.

---

## 1. System Architecture

```mermaid
graph TB
  subgraph Client["Frontend (Next.js + TypeScript + Tailwind)"]
    App["App Router"]
    Pages["Landing + Portal Pages"]
    Store["Local State + localStorage"]
  end

  subgraph Data["Seed Data"]
    Json["hackathonsjson/*.json"]
    Design["design_reference/1.png"]
    Docs["SSOT / PRD / Schema / Wireframe"]
  end

  subgraph Output["Submission Assets"]
    Web["Vercel Web URL"]
    Repo["GitHub Repo"]
    Pdf["PDF"]
  end

  App --> Pages
  Pages --> Store
  Json --> Store
  Docs --> Pages
  Design --> Pages
  Pages --> Web
  Docs --> Pdf
  Docs --> Repo
```

---

## 2. Route Map

```mermaid
graph TD
  Home["/"]
  HList["/hackathons"]
  HDetail["/hackathons/:slug"]
  Camp["/camp"]
  Rank["/rankings"]
  War["/war-room/:teamId"]

  Home --> HList
  Home --> Camp
  Home --> Rank
  HList --> HDetail
  HDetail --> Camp
  HDetail --> War
  Camp --> War
```

---

## 3. User Journey

```mermaid
journey
  title Hackerton 운영 포털 사용자 여정
  section 발견
    메인 랜딩 진입: 5: 참가자
    모집중 해커톤 탐색: 5: 참가자
  section 탐색
    해커톤 목록 보기: 5: 참가자
    상세 페이지에서 평가/일정 확인: 5: 참가자
  section 팀 구성
    팀 모집글 보기: 4: 참가자
    팀 생성 또는 합류: 4: 팀장, 팀원
  section 작전실
    체크리스트 확인: 5: 팀장, 팀원
    제출 단계 상태 확인: 5: 팀장
  section 제출/이해
    제출 가이드 확인: 5: 팀장
    리더보드와 평가 이해: 4: 참가자, 심사자
```

---

## 4. Local Data ERD

```mermaid
erDiagram
  Hackathon ||--o{ HackathonSection : has
  Hackathon ||--o{ Team : groups
  Hackathon ||--o{ Submission : tracks
  Hackathon ||--o{ LeaderboardEntry : ranks
  Team ||--o{ TeamMember : has
  Team ||--o{ TeamInvite : invites
  Team ||--|| WarRoom : owns
  WarRoom ||--o{ WarRoomChecklistItem : includes
  Submission ||--o{ SubmissionArtifact : has

  Hackathon {
    string slug
    string title
    string status
    number teamCount
  }
  Team {
    string id
    string hackathonSlug
    string name
    boolean isOpen
  }
  WarRoom {
    string id
    string teamId
    string submissionStage
  }
  Submission {
    string id
    string hackathonSlug
    string teamId
    string planStatus
    string webStatus
    string pdfStatus
  }
```

---

## 5. Submission Flow

```mermaid
flowchart LR
  A["팀 구성"] --> B["작전실 진입"]
  B --> C["기획서 준비"]
  C --> D["웹 URL + GitHub 준비"]
  D --> E["PDF 준비"]
  E --> F["리더보드/평가 이해"]
```

---

## 6. Privacy Boundaries

```mermaid
graph LR
  Public["Public Portal"]
  TeamLocal["Team-local Data"]
  Hidden["Never Expose"]

  Public -->|"hackathons, public teams, rankings"| TeamLocal
  TeamLocal -->|"war room, checklist, notes, invite states"| Hidden
  Hidden["internal user info / private info / other team internals / private contacts / applicant memo"]
```

---

## 7. Automation & Evidence Flow

```mermaid
graph TD
  SSOT["SSOT"]
  PRD["PRD"]
  Schema["Schema"]
  Wire["Wireframe"]
  Arch["Architecture"]
  Status["Status Docs"]
  Daily["Daily Logs"]
  Auto["Automations"]
  PDF["Final PDF Evidence"]

  SSOT --> PRD
  SSOT --> Schema
  SSOT --> Wire
  SSOT --> Arch
  PRD --> Status
  Schema --> Status
  Wire --> Daily
  Arch --> Daily
  Auto --> Status
  Status --> PDF
  Daily --> PDF
```

---

## 8. Missing-Check Nodes
- [ ] 상단바 이동
- [ ] 상태 UI 3종
- [ ] 상세 섹션 8개
- [ ] 작전실
- [ ] 팀 초대/수락/거절
- [ ] 제출 상태
- [ ] `미제출`
- [ ] GitHub + Vercel 연결
