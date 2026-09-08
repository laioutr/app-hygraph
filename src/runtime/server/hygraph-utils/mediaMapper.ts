import { Media } from '@laioutr-core/core-types/common';
import type { HygraphAsset } from '../types/hygraph';

/** Remove the file extension from a file name. */
export const stripFileExtension = (fileName: string) => fileName.replace(/\.[^.]+$/, '');

/** Convert a file name to a readable alt text. */
export const filenameToAlt = (fileName: string) =>
  stripFileExtension(fileName)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();

/**
 * Map a Hygraph asset to a Media object.
 */
export const mapHygraphMedia = (asset: HygraphAsset): Media => {
  const mimeType = typeof asset.mimeType === 'string' ? asset.mimeType : '';
  if (mimeType.startsWith('video/')) {
    return {
      type: 'video',
      sources: [
        {
          provider: 'hygraph',
          src: asset.url,
          // Hygraph extracts dimensions for images only — every video asset reports `width`/`height`
          // as null. `MediaSourceVideo` requires both as numbers, and the media library's trust
          // boundary drops any item that fails that schema, so `undefined` here made every video
          // vanish from the picker. 0 is the "unknown" placeholder; nothing in the render path reads
          // a video source's dimensions.
          width: asset.width ?? 0,
          height: asset.height ?? 0,
          // Full MIME type (e.g. `video/mp4`) — the frontend binds this to `<source type>`.
          format: mimeType,
        },
      ],
      alt: filenameToAlt(asset.fileName),
    };
  }
  return {
    type: 'image',
    sources: [
      {
        // SVGs are returned as none so Nuxt Image won't turn them into PNG file links.
        provider: mimeType === 'image/svg+xml' ? 'none' : 'hygraph',
        src: asset.url,
        width: asset.width ?? undefined,
        height: asset.height ?? undefined,
        responsive: 'static',
      },
    ],
    alt: filenameToAlt(asset.fileName),
  };
};
