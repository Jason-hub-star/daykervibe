/** Hackathon status enum */
export type HackathonStatus = 'upcoming' | 'ongoing' | 'ended';

/** Section types matching 8 required detail tabs */
export type HackathonSectionType =
  | 'overview'
  | 'guide'
  | 'eval'
  | 'schedule'
  | 'prize'
  | 'teams'
  | 'submit'
  | 'leaderboard';

/**
 * Core hackathon entity
 * @visibility public
 */
export interface Hackathon {
  id: string;
  slug: string;
  title: string;
  status: HackathonStatus;
  summary: string;
  tags: string[];
  eventStartAt: string;
  eventEndAt: string;
  registrationStartAt: string;
  registrationEndAt: string;
  teamCount?: number;
  viewCount?: number;
  prizeTotalKRW: number;
  thumbnailUrl?: string;
  sections: HackathonSection[];
}

/**
 * Detail section within a hackathon (8 types)
 * @visibility public
 */
export interface HackathonSection {
  id: string;
  hackathonSlug: string;
  type: HackathonSectionType;
  title: string;
  content: string;
  displayOrder: number;
  isRequired: boolean;
}
