import { BlogCollectionBase, BlogCollectionSeo } from '@laioutr-core/canonical-types/entity/blog-collection';
import { blogCollectionToken } from '../../const/passthroughTokens';
import { defineHygraph } from '../../middleware/defineHygraph';

export default defineHygraph.componentResolver({
  entityType: 'BlogCollection',
  label: 'Blog Collection',
  provides: [BlogCollectionBase, BlogCollectionSeo],
  resolve: async ({ passthrough, $entity }) => {
    const collection = passthrough.require(blogCollectionToken);

    return {
      entities: [
        $entity({
          id: collection.id,
          base: {
            slug: collection.slug,
            title: collection.title,
          },
          // Resolve `seo` locally so BlogCollection seo requests stay in the
          // Hygraph app. Without a Hygraph provider, the shared `BlogCollection`
          // entity type routes seo to another app's resolver (e.g. Shopify's
          // `nodes(ids:)` query), which rejects the Hygraph id as an invalid
          // global id. Hygraph blog collections/topics only carry `title`.
          seo: {
            title: collection.title,
          },
        }),
      ],
    };
  },
});
