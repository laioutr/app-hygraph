import { useRuntimeConfig } from '#imports';
import type { HygraphClientConfig, HygraphResponse } from '../types/hygraph';
import { Stage } from '../generated/graphql';

export type { HygraphResponse };

export const hygraphClientFactory = (explicitConfig?: HygraphClientConfig, options?: { isPreview?: boolean }) => {
  const config = explicitConfig ?? useRuntimeConfig()['@laioutr/app-hygraph'];
  let isPreview = options?.isPreview ?? false;

  // Trim so a blank or whitespace-only value counts as absent. `previewToken` is optional, and an
  // env var that resolves to '' or ' ' is the most likely way a project ends up half-configured.
  const previewToken = config.previewToken?.trim();

  // Fail soft: a misconfigured connector must serve published content, not
  // `Authorization: Bearer undefined`. Reachable through the public factory export whenever
  // an external caller passes an old-shaped HygraphClientConfig.
  if (isPreview && !previewToken) {
    console.warn('[app-hygraph] preview requested but previewToken is not configured — serving published content.');
    isPreview = false;
  }

  const request = async <TData = unknown>(query: string, variables: unknown = null): Promise<HygraphResponse<TData>> => {
    const res = await fetch(isPreview ? (config.previewApiUrl ?? config.contentApiUrl) : config.contentApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${isPreview ? previewToken : config.token}`,
      },
      // Every document in `queries/` declares `$stage: Stage = PUBLISHED`, so the variable can be
      // injected unconditionally without the client knowing which operation it is sending.
      body: JSON.stringify({
        query,
        variables: { ...(variables as object), stage: isPreview ? Stage.Draft : Stage.Published },
      }),
    });

    return res.json() as Promise<HygraphResponse<TData>>;
  };

  return { request };
};
