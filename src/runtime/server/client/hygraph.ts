import { useRuntimeConfig } from '#imports';

export const hygraphClientFactory = () => {
  const config = useRuntimeConfig()['@laioutr/app-hygraph'];

  const request = async (query: string, variables: unknown = null) => {
    const res = await fetch(config.contentApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    return res.json();
  };

  return { request };
};
