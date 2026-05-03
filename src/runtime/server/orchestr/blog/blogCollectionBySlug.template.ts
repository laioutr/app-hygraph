import { BlogCollectionBySlug } from '@laioutr-core/canonical-types/blog';
import type { BlogCollectionsQuery } from '../../generated/graphql';
import { defineHygraph } from '../../middleware/defineHygraph';
import { resolveHygraphLocales } from '../../hygraph-utils/locale';
import { BLOG_COLLECTIONS_QUERY } from '../../queries/blog';

export default defineHygraph.queryTemplateProvider({
  for: BlogCollectionBySlug,
  run: async ({ context, clientEnv }) => {
    const result = await context.hygraph.request<BlogCollectionsQuery>(BLOG_COLLECTIONS_QUERY, {
      locales: resolveHygraphLocales(clientEnv.locale),
    });

    return result.data.blogCollections.map((collection) => ({
      input: { slug: collection.slug },
      label: collection.title,
    }));
  },
});
