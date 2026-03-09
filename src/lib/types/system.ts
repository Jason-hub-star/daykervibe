/** Notice scope */
export type NoticeScope = 'global' | 'hackathon' | 'team';

/** Notice severity level */
export type NoticeLevel = 'info' | 'warning' | 'error';

/**
 * System-wide notice/alert
 * @visibility public
 */
export interface SystemNotice {
  id: string;
  scope: NoticeScope;
  hackathonSlug?: string;
  message: string;
  level: NoticeLevel;
}
