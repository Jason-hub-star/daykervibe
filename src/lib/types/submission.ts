/** Submission artifact status */
export type SubmissionStatus = 'empty' | 'draft' | 'submitted';

/** Submission artifact kind */
export type ArtifactKind = 'plan_url' | 'web_url' | 'github_url' | 'pdf_url';

/**
 * Submission tracking entity
 * @visibility public (except notes: team-local)
 */
export interface Submission {
  id: string;
  hackathonSlug: string;
  teamId?: string;
  planStatus: SubmissionStatus;
  webStatus: SubmissionStatus;
  pdfStatus: SubmissionStatus;
  /** @visibility team-local */
  notes?: string;
  submittedAt?: string;
}

/**
 * Submission artifact URL reference
 * @visibility team-local
 */
export interface SubmissionArtifact {
  id: string;
  submissionId: string;
  kind: ArtifactKind;
  url: string;
  label?: string;
}
