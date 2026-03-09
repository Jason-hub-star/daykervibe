/** Ranking period filter */
export type RankingPeriod = '7d' | '30d' | 'all';

/**
 * Global player ranking profile
 * @visibility public
 */
export interface RankingProfile {
  id: string;
  nickname: string;
  points: number;
  period: RankingPeriod;
  activitySummary?: string;
}
