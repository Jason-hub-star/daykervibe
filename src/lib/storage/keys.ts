/**
 * localStorage key constants — prefixed with expeditionHub.*
 * Matches schema.md "Local Storage Keys" section exactly.
 */
export const STORAGE_KEYS = {
  HACKATHONS: 'expeditionHub.hackathons',
  TEAMS: 'expeditionHub.teams',
  TEAM_MEMBERS: 'expeditionHub.teamMembers',
  TEAM_INVITES: 'expeditionHub.teamInvites',
  WAR_ROOMS: 'expeditionHub.warRooms',
  WAR_ROOM_WORKFLOW_CARDS: 'expeditionHub.warRoomWorkflowCards',
  WAR_ROOM_CHECKLIST: 'expeditionHub.warRoomChecklist',
  SUBMISSIONS: 'expeditionHub.submissions',
  SUBMISSION_ARTIFACTS: 'expeditionHub.submissionArtifacts',
  LEADERBOARDS: 'expeditionHub.leaderboards',
  RANKINGS: 'expeditionHub.rankings',
  SYSTEM_NOTICES: 'expeditionHub.systemNotices',
} as const;

/** Seeding flag to prevent duplicate seeding */
export const SEEDED_FLAG = 'expeditionHub.__seeded';

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
