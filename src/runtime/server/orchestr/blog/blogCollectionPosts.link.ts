import { BlogCollectionPostsLink } from '@laioutr-core/canonical-types/blog';
import { blogPostsToken } from '../../const/passthroughTokens';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BlogsByCollectionSlugQuery } from '../../queries/blog';

export default defineHygraph.linkHandler({
  implements: BlogCollectionPostsLink,
  run: async ({ context, entityIds, pagination, passthrough }) => {
    const blogsByCollection: Record<string, any[]> = {};

    for (const collectionSlug of entityIds) {
      const result = await context.hygraph.request(BlogsByCollectionSlugQuery, {
        collectionSlug,
        skip: pagination.offset,
        first: pagination.limit,
      });

      blogsByCollection[collectionSlug] = result.data.blogs ?? [];
    }

    const allBlogs: any[] = [];

    for (const key in blogsByCollection) {
      if (Object.prototype.hasOwnProperty.call(blogsByCollection, key)) {
        allBlogs.push(...blogsByCollection[key]);
      }
    }

    passthrough.set(blogPostsToken, allBlogs);

    return {
      links: entityIds.map((id) => ({
        sourceId: id,
        targetIds: (blogsByCollection[id] ?? []).map((blog: any) => blog.id),
      })),
    };
  },
});
