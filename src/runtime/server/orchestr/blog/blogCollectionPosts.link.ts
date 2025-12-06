import { BlogCollectionPostsLink } from '@laioutr-core/canonical-types/blog';
import { blogPostsToken } from '../../const/passthroughTokens';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BlogsQuery } from '../../queries/blog';

export default defineHygraph.linkHandler({
  implements: BlogCollectionPostsLink,
  run: async ({ context, entityIds, pagination, passthrough }) => {
    const result = await context.hygraph.request(BlogsQuery, {
      skip: pagination.offset,
      first: pagination.limit,
    });
    const blogs = result.data.blogs;

    passthrough.set(blogPostsToken, blogs);

    return {
      links: entityIds.map((id) => ({
        sourceId: id,
        targetIds: blogs.map((blog: any) => blog.id),
      })),
    };
  },
});
