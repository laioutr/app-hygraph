import type { BlogTopicBySlugQuery } from '../../generated/graphql';
import { BlogPostsByTopic } from '../../../shared/tokens/blog-topic';
import { blogCollectionToken, blogPostsTopicSourceToken } from '../../const/passthroughTokens';
import { resolveHygraphLocales } from '../../hygraph-utils/locale';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BLOG_TOPIC_BY_SLUG_QUERY } from '../../queries/blog';

export default defineHygraph.queryHandler({
  implements: BlogPostsByTopic,
  run: async ({ context, input, passthrough, clientEnv }) => {
    const result = await context.hygraph.request<BlogTopicBySlugQuery>(BLOG_TOPIC_BY_SLUG_QUERY, {
      slug: input.slug,
      locales: resolveHygraphLocales(clientEnv.locale),
    });

    const topic = result.data.topic;

    if (!topic) {
      return {};
    }

    // Expose the topic as a BlogCollection entity for the shared
    // `BlogCollectionBase` resolver. `slug`/`title` are localized (nullable) —
    // the topic matched the slug filter, so fall back to the input slug.
    passthrough.set(blogCollectionToken, {
      id: topic.id,
      slug: topic.slug ?? input.slug,
      title: topic.title ?? topic.slug ?? input.slug,
    });

    // Tell the `blog/collection/posts` link to resolve this id via the topic
    // relation instead of the blog-collection relation.
    passthrough.set(blogPostsTopicSourceToken, new Set([topic.id]));

    return {
      id: topic.id,
    };
  },
});
