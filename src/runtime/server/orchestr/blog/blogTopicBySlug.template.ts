import type { BlogTopicsQuery } from '../../generated/graphql';
import { BlogTopicBySlug } from '../../../shared/tokens/blog-topic';
import { resolveHygraphLocales } from '../../hygraph-utils/locale';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BLOG_TOPICS_QUERY } from '../../queries/blog';

export default defineHygraph.queryTemplateProvider({
  for: BlogTopicBySlug,
  run: async ({ context, clientEnv }) => {
    const result = await context.hygraph.request<BlogTopicsQuery>(BLOG_TOPICS_QUERY, {
      locales: resolveHygraphLocales(clientEnv.locale),
    });

    return result.data.topics.map((topic) => ({
      input: { slug: topic.slug },
      label: topic.title,
    }));
  },
});
