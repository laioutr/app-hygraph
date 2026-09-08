import { describe, expect, it } from 'vitest';
import { Media as MediaSchema } from '@laioutr-core/core-types/common';
import { mapHygraphMedia } from '../src/runtime/server/hygraph-utils/mediaMapper';

/**
 * Hygraph only extracts dimensions for images; video assets always report `width`/`height` as null.
 * `MediaSourceVideo` requires both as numbers, and the media library's trust boundary silently drops
 * every item that fails the schema — so a video mapped without them never reaches the picker. These
 * tests parse the mapper's output against the canonical schema, which is the same check that
 * boundary runs.
 */
describe('mapHygraphMedia', () => {
  const video = {
    url: 'https://media.graphassets.com/abc',
    fileName: '2021_03_05_karls_geschichte_720.mp4',
    mimeType: 'video/mp4',
    width: null,
    height: null,
    handle: 'abc',
  };

  it('maps a dimensionless video to a schema-valid MediaVideo', () => {
    const media = mapHygraphMedia(video);

    expect(media).toMatchObject({
      type: 'video',
      sources: [{ provider: 'hygraph', src: video.url, width: 0, height: 0, format: 'video/mp4' }],
      alt: '2021 03 05 karls geschichte 720',
    });
    expect(MediaSchema.safeParse(media).success).toBe(true);
  });

  it('keeps real dimensions when Hygraph reports them', () => {
    const media = mapHygraphMedia({ ...video, width: 1280, height: 720 });

    expect(media.sources[0]).toMatchObject({ width: 1280, height: 720 });
    expect(MediaSchema.safeParse(media).success).toBe(true);
  });

  it('maps an image to a schema-valid MediaImage', () => {
    const media = mapHygraphMedia({
      url: 'https://media.graphassets.com/def',
      fileName: 'geschichte-1.webp',
      mimeType: 'image/webp',
      width: 1025,
      height: 559,
      handle: 'def',
    });

    expect(media).toMatchObject({
      type: 'image',
      sources: [{ provider: 'hygraph', width: 1025, height: 559, responsive: 'static' }],
      alt: 'Geschichte 1',
    });
    expect(MediaSchema.safeParse(media).success).toBe(true);
  });

  it('leaves SVGs untransformed by Nuxt Image', () => {
    const media = mapHygraphMedia({
      url: 'https://media.graphassets.com/ghi',
      fileName: 'logo.svg',
      mimeType: 'image/svg+xml',
      width: 143,
      height: 71,
      handle: 'ghi',
    });

    expect(media.sources[0]).toMatchObject({ provider: 'none' });
    expect(MediaSchema.safeParse(media).success).toBe(true);
  });
});
