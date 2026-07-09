import type { BlogTopicsQuery } from '../../generated/graphql';
import { BlogPostsByTopic } from '../../../shared/tokens/blog-topic';
import { resolveHygraphLocales } from '../../hygraph-utils/locale';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BLOG_TOPICS_QUERY } from '../../queries/blog';

export default defineHygraph.queryTemplateProvider({
  for: BlogPostsByTopic,
  run: async ({ context, clientEnv, input }) => {
    // When the editor searches the topic picker, Studio sends the typed text as
    // `input.term`. Translate it into a Hygraph full-text filter so matching
    // happens server-side across the whole topic set — not just within the page
    // we happen to load below.
    const term = input.term?.trim();

    const result = await context.hygraph.request<BlogTopicsQuery>(BLOG_TOPICS_QUERY, {
      locales: resolveHygraphLocales(clientEnv.locale),
      // Hygraph caps a page at 100 items; load the full first page instead of
      // the default 10 so every topic is available in the picker.
      first: 100,
      where: term ? { _search: term } : undefined,
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
