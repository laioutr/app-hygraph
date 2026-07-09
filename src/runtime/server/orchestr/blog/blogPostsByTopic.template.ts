import type { BlogTopicsQuery } from '../../generated/graphql';
import { BlogPostsByTopic } from '../../../shared/tokens/blog-topic';
import { resolveHygraphLocales } from '../../hygraph-utils/locale';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BLOG_TOPICS_QUERY } from '../../queries/blog';

export default defineHygraph.queryTemplateProvider({
  for: BlogPostsByTopic,
  run: async ({ context, clientEnv }) => {
    const result = await context.hygraph.request<BlogTopicsQuery>(BLOG_TOPICS_QUERY, {
      locales: resolveHygraphLocales(clientEnv.locale),
    });

    // `slug`/`title` are localized and may be null for topics that are not
    // translated in the requested locale (or the `en` fallback) — skip those
    // rather than emitting broken picker entries.
    return result.data.topics
      .filter((topic): topic is { slug: string; title: string } => Boolean(topic.slug && topic.title))
      .map((topic) => ({
        input: { slug: topic.slug },
        label: topic.title,
      }));
  },
});
