/** Team member status */
export type TeamMemberStatus = 'active' | 'pending';

/** Team invite status */
export type TeamInviteStatus = 'sent' | 'accepted' | 'rejected';

/**
 * Expedition team (원정대)
 * @visibility public (except ownerLabel: private-hidden, updatedAt: team-local)
 */
export interface Team {
  id: string;
  hackathonSlug?: string;
  name: string;
  intro: string;
  isOpen: boolean;
  lookingFor: string[];
  contactUrl: string;
  memberCount: number;
  /** @visibility private-hidden — never render in UI */
  ownerLabel?: string;
  createdAt: string;
  /** @visibility team-local */
  updatedAt?: string;
}

/**
 * Team member
 * @visibility team-local
 */
export interface TeamMember {
  id: string;
  teamId: string;
  displayName: string;
  roleLabel?: string;
  status: TeamMemberStatus;
  /** @visibility private-hidden */
  isPrivateProfile: boolean;
}

/**
 * Team invitation
 * @visibility team-local
 */
export interface TeamInvite {
  id: string;
  teamId: string;
  inviteeLabel: string;
  status: TeamInviteStatus;
  createdAt: string;
}
