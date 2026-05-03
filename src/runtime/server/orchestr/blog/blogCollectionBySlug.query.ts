import { BlogCollectionBySlug } from '@laioutr-core/canonical-types/blog';
import type { BlogCollectionBySlugQuery } from '../../generated/graphql';
import { blogCollectionToken } from '../../const/passthroughTokens';
import { resolveHygraphLocales } from '../../hygraph-utils/locale';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BLOG_COLLECTION_BY_SLUG_QUERY } from '../../queries/blog';

export default defineHygraph.queryHandler({
  implements: BlogCollectionBySlug,
  run: async ({ context, input, passthrough, clientEnv }) => {
    const result = await context.hygraph.request<BlogCollectionBySlugQuery>(BLOG_COLLECTION_BY_SLUG_QUERY, {
      slug: input.slug,
      locales: resolveHygraphLocales(clientEnv.locale),
    });

    const collection = result.data.blogCollection;

    if (!collection) {
      throw new Error(`Blog collection with slug "${input.slug}" not found`);
    }

    passthrough.set(blogCollectionToken, collection);

    return {
      id: collection.id,
    };
  },
});
