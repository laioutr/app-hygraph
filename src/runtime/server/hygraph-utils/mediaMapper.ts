import { MediaImage } from '@laioutr-core/core-types/common';

/**
 * Map a Hygraph asset to a Media object.
 */
export const mapHygraphMedia = (asset: any): MediaImage => ({
  type: 'image',
  sources: [
    {
      // SVGs are returned as none so they won't be processed by Nuxt Image.
      provider: asset.mimeType === 'image/svg+xml' ? 'none' : 'hygraph',
      src: asset.url,
      width: asset.width,
      height: asset.height,
      responsive: 'static',
    },
  ],
  alt: asset.fileName,
});
