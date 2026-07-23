import { fileURLToPath } from 'node:url';
import { setup } from '@nuxt/test-utils/e2e';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { hygraphClientFactory } from '../src/runtime/server/client/hygraph';

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  });

  it('renders the index page', async () => {
    // Noop
  });
});

describe('hygraphClientFactory stage selection', () => {
  const config = {
    contentApiUrl: 'https://api.test/content',
    previewApiUrl: 'https://api.test/preview',
    token: 'published-token',
    previewToken: 'draft-token',
  } as any;

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('uses the published endpoint, token and stage by default', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ data: {} }) });
    vi.stubGlobal('fetch', fetchMock);

    await hygraphClientFactory(config).request('query Q { x }', { a: 1 });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.test/content');
    expect(init.headers.Authorization).toBe('Bearer published-token');
    expect(JSON.parse(init.body).variables).toEqual({ a: 1, stage: 'PUBLISHED' });
  });

  it('uses the preview endpoint, token and stage when isPreview is true', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ data: {} }) });
    vi.stubGlobal('fetch', fetchMock);

    await hygraphClientFactory(config, { isPreview: true }).request('query Q { x }', { a: 1 });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.test/preview');
    expect(init.headers.Authorization).toBe('Bearer draft-token');
    expect(JSON.parse(init.body).variables).toEqual({ a: 1, stage: 'DRAFT' });
  });

  it('falls back to contentApiUrl when previewApiUrl is unset', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ data: {} }) });
    vi.stubGlobal('fetch', fetchMock);

    await hygraphClientFactory({ ...config, previewApiUrl: undefined }, { isPreview: true }).request('query Q { x }');

    expect(fetchMock.mock.calls[0][0]).toBe('https://api.test/content');
  });

  // Fail soft: a misconfigured connector must serve published content, never
  // `Authorization: Bearer undefined`.
  it('degrades to published when preview is requested but previewToken is missing', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ data: {} }) });
    vi.stubGlobal('fetch', fetchMock);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await hygraphClientFactory({ ...config, previewToken: undefined }, { isPreview: true }).request('query Q { x }');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.test/content');
    expect(init.headers.Authorization).toBe('Bearer published-token');
    expect(JSON.parse(init.body).variables.stage).toBe('PUBLISHED');
    expect(warnSpy).toHaveBeenCalled();
  });

  // Regression guard for the media library (media-library/hygraph.ts:13 calls with no args)
  // and for any external consumer of the public factory export.
  it('a no-arg call still yields published', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ data: {} }) });
    vi.stubGlobal('fetch', fetchMock);

    await hygraphClientFactory(config).request('query Q { x }');

    expect(JSON.parse(fetchMock.mock.calls[0][1].body).variables.stage).toBe('PUBLISHED');
  });
});
