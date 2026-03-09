/** Submission preparation stages */
export type SubmissionStage = 'teaming' | 'plan' | 'web' | 'pdf' | 'done';

/** Workflow board columns */
export type WorkflowColumn = 'plan' | 'web' | 'pdf' | 'submitted';

/** Checklist item status */
export type ChecklistStatus = 'todo' | 'doing' | 'done';

/**
 * War Room — 제출 준비 관리 허브 (NOT a collaboration tool)
 * @visibility team-local
 */
export interface WarRoom {
  id: string;
  teamId: string;
  title: string;
  summary: string;
  submissionStage: SubmissionStage;
  nextActionLabel?: string;
  lastUpdated: string;
  notes?: string;
}

/**
 * Kanban-style workflow card in war room
 * @visibility team-local
 */
export interface WarRoomWorkflowCard {
  id: string;
  warRoomId: string;
  title: string;
  column: WorkflowColumn;
  order: number;
  ownerLabel?: string;
  dueLabel?: string;
  notes?: string;
  isBlocked: boolean;
}

/**
 * Checklist item in war room
 * @visibility team-local
 */
export interface WarRoomChecklistItem {
  id: string;
  warRoomId: string;
  label: string;
  status: ChecklistStatus;
  assigneeLabel?: string;
  dueAt?: string;
}
