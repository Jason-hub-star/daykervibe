/** Leaderboard subject type */
export type LeaderboardSubjectType = 'team' | 'user';

/** Leaderboard entry status */
export type LeaderboardStatus = 'ranked' | 'not_submitted';

/**
 * Leaderboard entry for a hackathon
 * @visibility public
 */
export interface LeaderboardEntry {
  id: string;
  hackathonSlug: string;
  subjectType: LeaderboardSubjectType;
  subjectId: string;
  name: string;
  rank?: number;
  score: number;
  status: LeaderboardStatus;
  scoreBreakdown?: Record<string, number>;
}
