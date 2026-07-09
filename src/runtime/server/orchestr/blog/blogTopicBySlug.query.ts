import type { BlogTopicBySlugQuery } from '../../generated/graphql';
import { BlogTopicBySlug, BlogTopicBySlugNotFoundError } from '../../../shared/tokens/blog-topic';
import { blogTopicToken } from '../../const/passthroughTokens';
import { resolveHygraphLocales } from '../../hygraph-utils/locale';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BLOG_TOPIC_BY_SLUG_QUERY } from '../../queries/blog';

export default defineHygraph.queryHandler({
  implements: BlogTopicBySlug,
  run: async ({ context, input, passthrough, clientEnv }) => {
    const result = await context.hygraph.request<BlogTopicBySlugQuery>(BLOG_TOPIC_BY_SLUG_QUERY, {
      slug: input.slug,
      locales: resolveHygraphLocales(clientEnv.locale),
    });

    const topic = result.data.topic;

    if (!topic) {
      throw new BlogTopicBySlugNotFoundError(input.slug);
    }

    passthrough.set(blogTopicToken, topic);

    return {
      id: topic.id,
    };
  },
});
