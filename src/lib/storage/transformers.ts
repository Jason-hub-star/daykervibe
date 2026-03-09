/**
 * Transformers: hackathonsjson/ raw JSON → schema.md entity types.
 * Each transformer normalizes field names, flattens nested structures,
 * and generates missing required fields.
 */

import type {
  Hackathon,
  HackathonSection,
  HackathonSectionType,
  HackathonStatus,
  Team,
  LeaderboardEntry,
} from '@/lib/types';

// ----- Raw JSON types (from hackathonsjson/) -----

interface RawHackathon {
  slug: string;
  title: string;
  status: string;
  tags: string[];
  thumbnailUrl?: string;
  period: {
    timezone: string;
    submissionDeadlineAt: string;
    endAt: string;
  };
  links: {
    detail: string;
    rules: string;
    faq: string;
  };
}

interface RawDetailSections {
  overview?: {
    summary?: string;
    teamPolicy?: { allowSolo?: boolean; maxTeamSize?: number };
  };
  info?: {
    notice?: string[];
    links?: Record<string, string>;
  };
  eval?: {
    metricName?: string;
    description?: string;
    scoreSource?: string;
    scoreDisplay?: unknown;
    limits?: Record<string, unknown>;
  };
  schedule?: {
    timezone?: string;
    milestones?: { name: string; at: string }[];
  };
  prize?: {
    items?: { place: string; amountKRW: number }[];
  };
  teams?: {
    campEnabled?: boolean;
    listUrl?: string;
  };
  submit?: {
    allowedArtifactTypes?: string[];
    submissionUrl?: string;
    guide?: string[];
    submissionItems?: { key: string; title: string; format: string }[];
  };
  leaderboard?: {
    publicLeaderboardUrl?: string;
    note?: string;
  };
}

interface RawDetail {
  slug: string;
  title: string;
  sections: RawDetailSections;
  extraDetails?: { slug: string; title: string; sections: RawDetailSections }[];
}

interface RawTeam {
  teamCode: string;
  hackathonSlug: string;
  name: string;
  isOpen: boolean;
  memberCount: number;
  lookingFor: string[];
  intro: string;
  contact: { type: string; url: string };
  createdAt: string;
}

interface RawLeaderboardFile {
  hackathonSlug: string;
  updatedAt: string;
  entries: RawLeaderboardEntry[];
  extraLeaderboards?: {
    hackathonSlug: string;
    updatedAt: string;
    entries: RawLeaderboardEntry[];
  }[];
}

interface RawLeaderboardEntry {
  rank: number;
  teamName: string;
  score: number;
  submittedAt: string;
  scoreBreakdown?: Record<string, number>;
  artifacts?: Record<string, string>;
}

// ----- Section type mapping -----

const SECTION_TYPE_MAP: Record<string, HackathonSectionType> = {
  overview: 'overview',
  info: 'guide', // JSON uses "info", schema uses "guide"
  eval: 'eval',
  schedule: 'schedule',
  prize: 'prize',
  teams: 'teams',
  submit: 'submit',
  leaderboard: 'leaderboard',
};

const SECTION_TITLES: Record<HackathonSectionType, string> = {
  overview: '개요',
  guide: '안내',
  eval: '평가',
  schedule: '일정',
  prize: '상금',
  teams: '팀',
  submit: '제출',
  leaderboard: '리더보드',
};

// ----- Helpers -----

function sectionToContent(key: string, data: Record<string, unknown>): string {
  return JSON.stringify(data);
}

function buildSections(slug: string, raw: RawDetailSections): HackathonSection[] {
  const sections: HackathonSection[] = [];
  let order = 0;

  for (const [rawKey, sectionData] of Object.entries(raw)) {
    const type = SECTION_TYPE_MAP[rawKey];
    if (!type || !sectionData) continue;

    sections.push({
      id: `${slug}-section-${type}`,
      hackathonSlug: slug,
      type,
      title: SECTION_TITLES[type],
      content: sectionToContent(rawKey, sectionData as Record<string, unknown>),
      displayOrder: order++,
      isRequired: true,
    });
  }

  return sections;
}

function computePrizeTotal(sections: RawDetailSections): number {
  if (!sections.prize?.items) return 0;
  return sections.prize.items.reduce((sum, item) => sum + item.amountKRW, 0);
}

function extractEventStart(sections: RawDetailSections): string {
  const milestones = sections.schedule?.milestones;
  if (milestones && milestones.length > 0) {
    return milestones[0].at;
  }
  return new Date().toISOString();
}

// ----- Public transformers -----

/**
 * Transform raw hackathon list + detail into Hackathon entities.
 */
export function transformHackathons(
  rawList: RawHackathon[],
  rawDetail: RawDetail,
): Hackathon[] {
  // Build a detail map: slug → sections
  const detailMap = new Map<string, { title: string; sections: RawDetailSections }>();
  detailMap.set(rawDetail.slug, {
    title: rawDetail.title,
    sections: rawDetail.sections,
  });
  if (rawDetail.extraDetails) {
    for (const extra of rawDetail.extraDetails) {
      detailMap.set(extra.slug, { title: extra.title, sections: extra.sections });
    }
  }

  return rawList.map((raw) => {
    const detail = detailMap.get(raw.slug);
    const sections = detail ? buildSections(raw.slug, detail.sections) : [];
    const detailSections = detail?.sections;

    return {
      id: raw.slug,
      slug: raw.slug,
      title: raw.title,
      status: raw.status as HackathonStatus,
      summary: detailSections?.overview?.summary ?? raw.title,
      tags: raw.tags,
      thumbnailUrl: raw.thumbnailUrl,
      eventStartAt: detailSections ? extractEventStart(detailSections) : raw.period.endAt,
      eventEndAt: raw.period.endAt,
      registrationStartAt: detailSections
        ? extractEventStart(detailSections)
        : raw.period.endAt,
      registrationEndAt: raw.period.submissionDeadlineAt,
      prizeTotalKRW: detailSections ? computePrizeTotal(detailSections) : 0,
      sections,
    };
  });
}

/**
 * Transform raw teams into Team entities.
 */
export function transformTeams(rawTeams: RawTeam[]): Team[] {
  return rawTeams.map((raw) => ({
    id: raw.teamCode,
    hackathonSlug: raw.hackathonSlug,
    name: raw.name,
    intro: raw.intro,
    isOpen: raw.isOpen,
    lookingFor: raw.lookingFor,
    contactUrl: raw.contact.url,
    memberCount: raw.memberCount,
    createdAt: raw.createdAt,
  }));
}

/**
 * Transform raw leaderboard into LeaderboardEntry entities.
 */
export function transformLeaderboard(raw: RawLeaderboardFile): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = [];

  // Main leaderboard
  for (const entry of raw.entries) {
    entries.push({
      id: `${raw.hackathonSlug}-${entry.rank}`,
      hackathonSlug: raw.hackathonSlug,
      subjectType: 'team',
      subjectId: entry.teamName.toLowerCase().replace(/\s+/g, '-'),
      name: entry.teamName,
      rank: entry.rank,
      score: entry.score,
      status: 'ranked',
      scoreBreakdown: entry.scoreBreakdown,
    });
  }

  // Extra leaderboards
  if (raw.extraLeaderboards) {
    for (const extra of raw.extraLeaderboards) {
      for (const entry of extra.entries) {
        entries.push({
          id: `${extra.hackathonSlug}-${entry.rank}`,
          hackathonSlug: extra.hackathonSlug,
          subjectType: 'team',
          subjectId: entry.teamName.toLowerCase().replace(/\s+/g, '-'),
          name: entry.teamName,
          rank: entry.rank,
          score: entry.score,
          status: 'ranked',
          scoreBreakdown: entry.scoreBreakdown,
        });
      }
    }
  }

  return entries;
}
