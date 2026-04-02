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
}

export interface HygraphResponse<TData> {
  data: TData;
  errors?: Array<{ message: string }>;
}
