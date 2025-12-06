import { MediaImage } from '@laioutr-core/core-types/common';

/**
 * Map a Hygraph asset to a Media object
 */
export const mapHygraphMedia = (asset: any): MediaImage => ({
  type: 'image',
  sources: [
    {
      provider: 'hygraph',
      src: asset.url,
      width: asset.width,
      height: asset.height,
      responsive: 'static',
    },
  ],
  alt: asset.fileName,
});
