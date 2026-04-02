import { MediaImage } from '@laioutr-core/core-types/common';
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
export const mapHygraphMedia = (asset: HygraphAsset): MediaImage => ({
  type: 'image',
  sources: [
    {
      // SVGs are returned as none so Nuxt Image won't turn them into PNG file links.
      provider: asset.mimeType === 'image/svg+xml' ? 'none' : 'hygraph',
      src: asset.url,
      width: asset.width ?? undefined,
      height: asset.height ?? undefined,
      responsive: 'static',
    },
  ],
  alt: filenameToAlt(asset.fileName),
});
