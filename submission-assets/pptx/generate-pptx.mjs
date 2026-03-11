import fs from "node:fs";
import path from "node:path";
import PptxGenJS from "pptxgenjs";

const rootDir = path.resolve(import.meta.dirname, "..", "..");
const outputDir = path.resolve(import.meta.dirname, "out");

fs.mkdirSync(outputDir, { recursive: true });

const deck = new PptxGenJS();
deck.layout = "LAYOUT_WIDE";
deck.author = "OpenAI Codex";
deck.company = "Expedition Hub";
deck.subject = "Expedition Hub hackathon submission deck";
deck.title = "Expedition Hub Submission Deck";
deck.lang = "ko-KR";
deck.theme = {
  headFontFace: "Malgun Gothic",
  bodyFontFace: "Malgun Gothic",
  lang: "ko-KR"
};
deck.defineLayout({ name: "CUSTOM_WIDE", width: 13.333, height: 7.5 });
deck.layout = "CUSTOM_WIDE";

const colors = {
  ink: "111827",
  slate: "475569",
  line: "D7DEE8",
  panel: "F6F7FB",
  brand: "F59E0B",
  brandSoft: "FEF3C7",
  sky: "DCEAFE",
  skyText: "1D4ED8",
  success: "DCFCE7",
  successText: "166534",
  white: "FFFFFF"
};

const links = {
  vercel: "https://daykervibe.vercel.app/",
  github: "https://github.com/kimjuyoung1127/daykervibe"
};

const images = {
  home: path.resolve(rootDir, "output", "playwright", "home-1280x800.png"),
  detail: path.resolve(rootDir, "output", "playwright", "detail-1280x800.png"),
  detailTeams: path.resolve(rootDir, "output", "playwright", "detail-teams-1280x800.png"),
  camp: path.resolve(rootDir, "output", "playwright", "camp-1280x800.png"),
  campForm: path.resolve(rootDir, "output", "playwright", "camp-form-1280x800.png"),
  warRoom: path.resolve(rootDir, "output", "playwright", "war-room-drag-desktop-1280.png"),
  rankings: path.resolve(rootDir, "output", "playwright", "rankings-1280x800.png")
};

const slides = [
  {
    title: "Expedition Hub",
    kicker: "재사용형 해커톤 실행 포털",
    summary: "원정대 구성부터 제출 준비 관리, 결과 확인까지 이어지는 재사용형 해커톤 실행 포털",
    image: images.home,
    bullets: [
      "배포 URL과 GitHub만으로 심사자가 바로 검수 가능한 구조",
      "Camp와 War Room을 통해 원정대 구성과 실행 흐름을 분리해 설계",
      "localStorage 기반으로 별도 키 없이 동작"
    ],
    footerTag: "Cover"
  },
  {
    title: "문제 정의",
    image: images.home,
    bullets: [
      "해커톤 정보 확인, 원정대 구성, 제출 준비 관리, 결과 확인이 서로 분리돼 사용 흐름이 끊깁니다.",
      "심사자도 공개 URL 기준으로 빠르게 구조를 이해하고 검수하기 어렵습니다.",
      "더미 데이터와 로컬 저장을 활용하되 실제 제품처럼 보이는 흐름이 필요했습니다."
    ]
  },
  {
    title: "해결 방향",
    image: images.detail,
    bullets: [
      "공개 포털은 해커톤 이해와 탐색에 집중합니다.",
      "Camp는 원정대 구성과 모집 허브 역할을 맡습니다.",
      "War Room은 원정대 단위 제출 준비를 관리하는 실행 공간입니다."
    ],
    callout: "구성부터 제출 준비까지"
  },
  {
    title: "전체 제품 구조",
    image: images.detail,
    bullets: [
      "/",
      "/hackathons",
      "/hackathons/:slug",
      "/camp",
      "/rankings",
      "/war-room/:teamId"
    ],
    callout: "핵심 6개 라우트"
  },
  {
    title: "메인 / 목록 UX",
    image: images.home,
    bullets: [
      "메인에서 해커톤 탐색, 팀 찾기, 랭킹 보기 CTA를 즉시 제시합니다.",
      "목록은 upcoming -> ongoing -> ended 우선순위로 정렬됩니다.",
      "상태 필터와 태그 필터로 탐색 비용을 줄였습니다."
    ]
  },
  {
    title: "상세 페이지 8개 섹션",
    image: images.detail,
    bullets: [
      "요약 바에서 상태, 기간, 팀 수, 조회수, 총상금을 빠르게 확인합니다.",
      "개요, 안내, 평가, 일정, 상금, 팀, 제출, 리더보드를 한 화면 서사로 구성했습니다.",
      "팀 만들기, 팀 찾기, 제출 준비로 자연스럽게 이어지도록 설계했습니다."
    ]
  },
  {
    title: "Camp와 원정대 구성",
    image: images.campForm,
    bullets: [
      "해커톤별 원정대 생성과 모집 탐색을 한 흐름으로 제공합니다.",
      "모집 역할은 칩 UI로 통일해 입력 실수와 읽기 부담을 줄였습니다.",
      "커스텀 팀은 수정과 모집 마감까지 로컬 상태에서 관리할 수 있습니다."
    ]
  },
  {
    title: "War Room",
    image: images.warRoom,
    bullets: [
      "베이스캠프 요약, 단계 관리, 카드 보드를 한 화면에 배치했습니다.",
      "체크리스트, 링크, 메모를 통해 원정대의 제출 준비 상태를 구체적으로 추적합니다.",
      "삭제, 이동, 정렬 등 세부 동작도 localStorage에 유지됩니다."
    ],
    callout: "원정대 제출 준비 허브"
  },
  {
    title: "제출 준비 Handoff",
    image: images.detailTeams,
    bullets: [
      "상세 페이지에서는 최소 draft만 저장해 공개 검수 흐름을 유지합니다.",
      "text, URL, file 입력 타입을 지원해 요구 형식에 대응합니다.",
      "실제 원정대 단위 관리와 준비 상태는 War Room으로 이어집니다."
    ]
  },
  {
    title: "데이터 / 아키텍처",
    image: images.camp,
    bullets: [
      "부트스트랩 JSON으로 기본 데이터를 로드하고, 사용자 변경은 localStorage에 저장합니다.",
      "공개 포털 데이터와 팀 전용 데이터 경계를 분리해 심사 친화성과 프라이버시를 함께 챙겼습니다.",
      "외부 API나 별도 키 없이도 전체 흐름을 확인할 수 있습니다."
    ]
  },
  {
    title: "검증 / 배포",
    image: images.rankings,
    bullets: [
      "Next.js 앱은 lint와 build를 통과했습니다.",
      "Vercel 배포 URL 기준으로 핵심 6개 라우트 접근을 확인했습니다.",
      "공유 메타를 보강해 링크 공유 시 대표 제목과 이미지가 노출되도록 맞췄습니다."
    ],
    callout: "배포 기준 검수 가능"
  },
  {
    title: "자산 / 라이선스",
    image: images.home,
    bullets: [
      "Fonts: Press Start 2P (SIL OFL 1.1), DungGeunMo (Public Domain 표기 기반 사용)",
      "Images and SVG icons: team-authored assets created or optimized for this project",
      "제출 자료는 실제 배포 화면 캡처를 우선 사용합니다."
    ]
  },
  {
    title: "결론 / 확장",
    image: images.warRoom,
    bullets: [
      "Expedition Hub는 정보 확인을 넘어 원정대 구성, 제출 준비 관리, 결과 확인까지 연결하는 제품입니다.",
      "심사자는 배포 URL과 GitHub 링크만으로 핵심 구조를 빠르게 검수할 수 있습니다.",
      "자동화된 코드 리뷰와 문서 정합성 점검 흐름으로 회귀와 불일치 가능성을 줄였습니다."
    ],
    callout: "배포 URL 기준 바로 검수 가능"
  }
];

function addBackground(slide) {
  slide.background = { color: colors.white };
  slide.addShape(deck.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    line: { color: colors.white, transparency: 100 },
    fill: { color: colors.white }
  });
  slide.addShape(deck.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.2,
    line: { color: colors.brand, transparency: 100 },
    fill: { color: colors.brand }
  });
}

function addFooter(slide, index) {
  slide.addText(`Expedition Hub Submission Deck`, {
    x: 0.5,
    y: 7.05,
    w: 4,
    h: 0.2,
    fontFace: "Malgun Gothic",
    fontSize: 9,
    color: colors.slate,
    margin: 0
  });
  slide.addText(`${index + 1}`, {
    x: 12.2,
    y: 7.02,
    w: 0.4,
    h: 0.2,
    align: "right",
    fontFace: "Malgun Gothic",
    fontSize: 9,
    color: colors.slate,
    margin: 0
  });
}

function addContentSlide(slideData, index) {
  const slide = deck.addSlide();
  addBackground(slide);
  addFooter(slide, index);

  slide.addText(slideData.title, {
    x: 0.6,
    y: 0.45,
    w: 6.5,
    h: 0.45,
    fontFace: "Malgun Gothic",
    bold: true,
    fontSize: 24,
    color: colors.ink,
    margin: 0
  });

  if (slideData.callout) {
    slide.addShape(deck.ShapeType.roundRect, {
      x: 10.35,
      y: 0.4,
      w: 2.25,
      h: 0.45,
      rectRadius: 0.08,
      line: { color: colors.brand, transparency: 100 },
      fill: { color: colors.brandSoft }
    });
    slide.addText(slideData.callout, {
      x: 10.5,
      y: 0.51,
      w: 1.95,
      h: 0.18,
      fontFace: "Malgun Gothic",
      bold: true,
      fontSize: 10,
      color: colors.ink,
      align: "center",
      margin: 0
    });
  }

  if (fs.existsSync(slideData.image)) {
    slide.addImage({
      path: slideData.image,
      x: 0.6,
      y: 1.1,
      w: 7.2,
      h: 4.3,
      rounding: false
    });
    slide.addShape(deck.ShapeType.roundRect, {
      x: 0.6,
      y: 1.1,
      w: 7.2,
      h: 4.3,
      rectRadius: 0.04,
      line: { color: colors.line, pt: 1 },
      fill: { color: colors.white, transparency: 100 }
    });
  }

  slide.addShape(deck.ShapeType.roundRect, {
    x: 8.2,
    y: 1.1,
    w: 4.5,
    h: 4.9,
    rectRadius: 0.05,
    line: { color: colors.line, pt: 1 },
    fill: { color: colors.panel }
  });

  const bulletRuns = slideData.bullets.map((bullet) => ({
    text: bullet,
    options: { bullet: { indent: 14 } }
  }));

  slide.addText(bulletRuns, {
    x: 8.5,
    y: 1.45,
    w: 3.85,
    h: 4.1,
    fontFace: "Malgun Gothic",
    fontSize: 16,
    color: colors.ink,
    breakLine: true,
    paraSpaceAfterPt: 14,
    margin: 0
  });

  slide.addText(links.vercel, {
    x: 0.75,
    y: 6.1,
    w: 5.7,
    h: 0.2,
    fontFace: "Malgun Gothic",
    fontSize: 10,
    color: colors.skyText,
    hyperlink: { url: links.vercel },
    margin: 0
  });
}

function addCoverSlide(slideData, index) {
  const slide = deck.addSlide();
  slide.addShape(deck.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    line: { color: "0B1120", transparency: 100 },
    fill: { color: "0B1120" }
  });
  slide.addShape(deck.ShapeType.roundRect, {
    x: 0.6,
    y: 0.6,
    w: 3.2,
    h: 0.5,
    rectRadius: 0.08,
    line: { color: colors.brand, transparency: 100 },
    fill: { color: colors.brandSoft }
  });
  slide.addText(slideData.kicker, {
    x: 0.8,
    y: 0.74,
    w: 2.8,
    h: 0.16,
    fontFace: "Malgun Gothic",
    fontSize: 11,
    bold: true,
    color: colors.ink,
    margin: 0
  });
  slide.addText(slideData.title, {
    x: 0.75,
    y: 1.45,
    w: 5.2,
    h: 1.0,
    fontFace: "Malgun Gothic",
    bold: true,
    fontSize: 30,
    color: colors.white,
    margin: 0
  });
  slide.addText(slideData.summary, {
    x: 0.75,
    y: 2.3,
    w: 5.2,
    h: 1.2,
    fontFace: "Malgun Gothic",
    fontSize: 16,
    color: colors.white,
    valign: "mid",
    breakLine: true,
    margin: 0
  });
  slide.addShape(deck.ShapeType.roundRect, {
    x: 0.75,
    y: 4.05,
    w: 5.1,
    h: 1.8,
    rectRadius: 0.05,
    line: { color: "FFFFFF", transparency: 70, pt: 1 },
    fill: { color: "0F172A", transparency: 20 }
  });
  const bulletRuns = slideData.bullets.map((bullet) => ({
    text: bullet,
    options: { bullet: { indent: 14 } }
  }));
  slide.addText(bulletRuns, {
    x: 1.0,
    y: 4.35,
    w: 4.45,
    h: 1.1,
    fontFace: "Malgun Gothic",
    fontSize: 14,
    color: colors.white,
    paraSpaceAfterPt: 10,
    margin: 0
  });
  if (fs.existsSync(slideData.image)) {
    slide.addShape(deck.ShapeType.roundRect, {
      x: 6.55,
      y: 1.2,
      w: 6.05,
      h: 4.9,
      rectRadius: 0.05,
      line: { color: "FFFFFF", transparency: 65, pt: 1.2 },
      fill: { color: "0F172A", transparency: 5 }
    });
    slide.addImage({ path: slideData.image, x: 6.78, y: 1.42, w: 5.6, h: 4.45 });
  }
  slide.addText(links.vercel, {
    x: 0.8,
    y: 6.45,
    w: 4.4,
    h: 0.2,
    fontFace: "Malgun Gothic",
    fontSize: 11,
    color: colors.white,
    hyperlink: { url: links.vercel },
    margin: 0
  });
  slide.addText(links.github, {
    x: 0.8,
    y: 6.75,
    w: 5.2,
    h: 0.2,
    fontFace: "Malgun Gothic",
    fontSize: 10,
    color: colors.white,
    hyperlink: { url: links.github },
    margin: 0
  });
  addFooter(slide, index);
}

slides.forEach((slideData, index) => {
  if (index === 0) {
    addCoverSlide(slideData, index);
    return;
  }
  addContentSlide(slideData, index);
});

const filePath = path.resolve(outputDir, "expedition-hub-submission-deck.pptx");
await deck.writeFile({ fileName: filePath });
console.log(`Generated: ${filePath}`);
