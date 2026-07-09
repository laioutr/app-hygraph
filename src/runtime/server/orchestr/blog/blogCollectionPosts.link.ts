import { BlogCollectionPostsLink } from '@laioutr-core/canonical-types/blog';
import type { BlogsByTopicQuery, BlogsQuery } from '../../generated/graphql';
import { blogPostsToken, blogPostsTopicSourceToken } from '../../const/passthroughTokens';
import { resolveHygraphLocales } from '../../hygraph-utils/locale';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BLOGS_BY_TOPIC_QUERY, BLOGS_QUERY } from '../../queries/blog';

// Hygraph caps `first` at 100. Topic listings are exposed through the shared
// blog-collection section, whose pagination is tuned for collection widgets
// (small page size — 10/12). A topic page instead wants to show all of its
// posts, so decouple it from that page size and fetch up to the Hygraph
// maximum in a single request. Beyond 100 posts per topic we'd need real
// pagination (offset/limit + a load-more UI) rather than a higher limit.
const HYGRAPH_MAX_FIRST = 100;

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
            first: HYGRAPH_MAX_FIRST,
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
