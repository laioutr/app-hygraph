import { MediaImage } from '@laioutr-core/core-types/common';
import type { AssetFragment } from '../generated/graphql';

/** Remove the file extension from a file name. */
const stripFileExtension = (fileName: string) => fileName.replace(/\.[^.]+$/, '');

/** Convert a file name to a readable alt text. */
const filenameToAlt = (fileName: string) => stripFileExtension(fileName);

/**
 * Map a Hygraph asset to a Media object.
 */
export const mapHygraphMedia = (asset: AssetFragment): MediaImage => ({
  type: 'image',
  sources: [
    {
      // SVGs are returned as none so they won't be processed by Nuxt Image.
      provider: asset.mimeType === 'image/svg+xml' ? 'none' : 'hygraph',
      src: asset.url,
      width: asset.width ?? undefined,
      height: asset.height ?? undefined,
      responsive: 'static',
    },
  ],
  alt: filenameToAlt(asset.fileName),
});
