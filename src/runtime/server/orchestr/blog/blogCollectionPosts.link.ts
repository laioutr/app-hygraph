import { BlogCollectionPostsLink } from '@laioutr-core/canonical-types/blog';
import type { BlogsByTopicQuery, BlogsQuery } from '../../generated/graphql';
import { blogPostsToken, blogPostsTopicSourceToken } from '../../const/passthroughTokens';
import { resolveHygraphLocales } from '../../hygraph-utils/locale';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BLOGS_BY_TOPIC_QUERY, BLOGS_QUERY } from '../../queries/blog';

export default defineHygraph.linkHandler({
  implements: BlogCollectionPostsLink,
  run: async ({ context, entityIds, pagination, passthrough, clientEnv }) => {
    const locales = resolveHygraphLocales(clientEnv.locale);
    const topicSourceIds = passthrough.get(blogPostsTopicSourceToken);

    const results = await Promise.all(
      entityIds.map((id) =>
        // Ids exposed by the "Blog Posts by Topic" query are topic ids and must
        // be filtered via the topic relation; all others are blog-collection ids.
        topicSourceIds?.has(id) ?
          context.hygraph.request<BlogsByTopicQuery>(BLOGS_BY_TOPIC_QUERY, {
            skip: pagination.offset,
            first: pagination.limit,
            topicId: id,
            locales,
          })
        : context.hygraph.request<BlogsQuery>(BLOGS_QUERY, {
            skip: pagination.offset,
            first: pagination.limit,
            collectionId: id,
            locales,
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
