import { useRuntimeConfig } from '#imports';

export interface HygraphResponse<TData> {
  data: TData;
  errors?: Array<{ message: string }>;
}

export const hygraphClientFactory = () => {
  const config = useRuntimeConfig()['@laioutr/app-hygraph'];

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
