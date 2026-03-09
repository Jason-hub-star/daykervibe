'use client';

/**
 * Seed localStorage from hackathonsjson/ bootstrap data.
 * Runs once per browser — guarded by __seeded flag.
 */

import { STORAGE_KEYS, SEEDED_FLAG } from './keys';
import { getItem, setItem, hasItem } from './local-storage';
import { transformHackathons, transformTeams, transformLeaderboard } from './transformers';

// Static JSON imports (bundled at build time)
import rawHackathons from '../../../hackathonsjson/public_hackathons.json';
import rawDetail from '../../../hackathonsjson/public_hackathon_detail.json';
import rawTeams from '../../../hackathonsjson/public_teams.json';
import rawLeaderboard from '../../../hackathonsjson/public_leaderboard.json';

/**
 * Seed all bootstrap data into localStorage.
 * No-op if already seeded or running on server.
 */
export function seedLocalStorage(): void {
  if (typeof window === 'undefined') return;
  if (hasItem(SEEDED_FLAG)) return;

  // Transform and store hackathons
  const hackathons = transformHackathons(rawHackathons, rawDetail);
  setItem(STORAGE_KEYS.HACKATHONS, hackathons);

  // Transform and store teams
  const teams = transformTeams(rawTeams);
  setItem(STORAGE_KEYS.TEAMS, teams);

  // Transform and store leaderboard entries
  const leaderboardEntries = transformLeaderboard(rawLeaderboard);
  setItem(STORAGE_KEYS.LEADERBOARDS, leaderboardEntries);

  // Initialize empty arrays for team-local entities
  if (!getItem(STORAGE_KEYS.TEAM_MEMBERS)) {
    setItem(STORAGE_KEYS.TEAM_MEMBERS, []);
  }
  if (!getItem(STORAGE_KEYS.TEAM_INVITES)) {
    setItem(STORAGE_KEYS.TEAM_INVITES, []);
  }
  if (!getItem(STORAGE_KEYS.WAR_ROOMS)) {
    setItem(STORAGE_KEYS.WAR_ROOMS, []);
  }
  if (!getItem(STORAGE_KEYS.WAR_ROOM_WORKFLOW_CARDS)) {
    setItem(STORAGE_KEYS.WAR_ROOM_WORKFLOW_CARDS, []);
  }
  if (!getItem(STORAGE_KEYS.WAR_ROOM_CHECKLIST)) {
    setItem(STORAGE_KEYS.WAR_ROOM_CHECKLIST, []);
  }
  if (!getItem(STORAGE_KEYS.SUBMISSIONS)) {
    setItem(STORAGE_KEYS.SUBMISSIONS, []);
  }
  if (!getItem(STORAGE_KEYS.SUBMISSION_ARTIFACTS)) {
    setItem(STORAGE_KEYS.SUBMISSION_ARTIFACTS, []);
  }
  if (!getItem(STORAGE_KEYS.RANKINGS)) {
    setItem(STORAGE_KEYS.RANKINGS, []);
  }
  if (!getItem(STORAGE_KEYS.SYSTEM_NOTICES)) {
    setItem(STORAGE_KEYS.SYSTEM_NOTICES, []);
  }

  // Mark as seeded
  setItem(SEEDED_FLAG, true);
}
