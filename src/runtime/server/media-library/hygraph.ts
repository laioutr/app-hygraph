import { defineMediaLibraryProvider } from '#imports';
import { ProviderStudioMediaItem } from '@laioutr-core/core-types/media-library';
import type { MediaLibraryListQuery } from '../generated/graphql';
import { hygraphClientFactory } from '../client/hygraph';
import { mapHygraphMedia } from '../hygraph-utils/mediaMapper';
import { MEDIA_LIBRARY_LIST_QUERY } from '../queries/mediaLibrary';

/** The generated operation type carries the page alone; the document also asks for the match count. */
type MediaLibraryListResult = MediaLibraryListQuery & { assetsConnection: { aggregate: { count: number } } };

export default defineMediaLibraryProvider({
  label: 'Hygraph',
  iconSrc: '/app-hygraph/logo.svg',
  name: 'hygraph',
  list: async ({ limit, offset, search }) => {
    const client = hygraphClientFactory();

    const result = await client.request<MediaLibraryListResult>(MEDIA_LIBRARY_LIST_QUERY, {
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
      // The picker pages by offset and stops as soon as it has seen `total` items, so a wrong count
      // here costs the tail of the library: at 0 it never asks for a second page.
      total: result.data.assetsConnection.aggregate.count,
      offset,
      limit,
    };
  },
});
