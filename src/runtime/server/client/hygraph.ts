import { useRuntimeConfig } from '#imports';
import type { HygraphClientConfig, HygraphResponse } from '../types/hygraph';

export type { HygraphResponse };

export const hygraphClientFactory = (explicitConfig?: HygraphClientConfig) => {
  const config = explicitConfig ?? useRuntimeConfig()['@laioutr/app-hygraph'];

  const request = async <TData = unknown>(query: string, variables: unknown = null): Promise<HygraphResponse<TData>> => {
    const res = await fetch(config.contentApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    return res.json() as Promise<HygraphResponse<TData>>;
  };

  return { request };
};
