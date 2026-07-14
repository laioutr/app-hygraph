import { defineMediaLibraryProvider } from '#imports';
import { ProviderStudioMediaItem } from '@laioutr-core/core-types/media-library';
import type { MediaLibraryListQuery } from '../generated/graphql';
import { hygraphClientFactory } from '../client/hygraph';
import { mapHygraphMedia } from '../hygraph-utils/mediaMapper';
import { MEDIA_LIBRARY_LIST_QUERY } from '../queries/mediaLibrary';

export default defineMediaLibraryProvider({
  label: 'Hygraph',
  iconSrc: '/app-hygraph/logo.svg',
  name: 'hygraph',
  list: async ({ limit, offset, search }) => {
    const client = hygraphClientFactory();

    const result = await client.request<MediaLibraryListQuery>(MEDIA_LIBRARY_LIST_QUERY, {
      skip: offset,
      first: limit,
      // Only constrain by `_search` when a term is present; an empty filter lists all assets (browse).
      where: search ? { _search: search } : {},
    });

    const items = result.data.assets.map(
      (asset): ProviderStudioMediaItem => ({
        media: mapHygraphMedia(asset),
        previewUrl: asset.url,
      })
    );

    return {
      items,
      total: 0,
      offset,
      limit,
    };
  },
});
