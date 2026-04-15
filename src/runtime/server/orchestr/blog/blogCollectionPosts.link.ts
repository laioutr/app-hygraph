import { BlogCollectionPostsLink } from '@laioutr-core/canonical-types/blog';
import type { BlogsQuery } from '../../generated/graphql';
import { blogPostsToken } from '../../const/passthroughTokens';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BLOGS_QUERY } from '../../queries/blog';

export default defineHygraph.linkHandler({
  implements: BlogCollectionPostsLink,
  run: async ({ context, entityIds, pagination, passthrough }) => {
    const results = await Promise.all(
      entityIds.map((id) =>
        context.hygraph.request<BlogsQuery>(BLOGS_QUERY, {
          skip: pagination.offset,
          first: pagination.limit,
          collectionId: id,
        })
      )
    );

    const allPosts = results.flatMap((r) => r.data.blogs);
    passthrough.set(blogPostsToken, allPosts);

    return {
      links: entityIds.map((id, i) => {
        const data = results.at(i)?.data;
        return {
          sourceId: id,
          targetIds: data?.blogs.map((blog) => blog.id) ?? [],
          entityTotal: data?.blogsConnection.aggregate.count ?? data?.blogs.length ?? 0,
        };
      }),
    };
  },
});
