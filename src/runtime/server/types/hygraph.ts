export interface HygraphAsset {
  url: string;
  fileName: string;
  mimeType?: string | null;
  width?: number | null;
  height?: number | null;
  handle: string;
}

export interface HygraphClientConfig {
  contentApiUrl: string;
  token: string;
  /**
   * Optional. PAT with Draft-stage read permission. Separate from `token` so published reads keep a
   * least-privileged credential. Without it the connector always serves published content, even when
   * a verified preview token marks the request as a preview.
   */
  previewToken?: string;
  /** Optional. Hygraph's Content API serves both stages; only needed if a project observes CDN staleness on drafts. */
  previewApiUrl?: string;
}

export interface HygraphResponse<TData> {
  data: TData;
  errors?: Array<{ message: string }>;
}
