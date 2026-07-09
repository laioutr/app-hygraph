import z from 'zod/v4';
import { defineQueryToken } from '@laioutr-core/core-types/orchestr';

/**
 * Exposes a blog topic AS a `BlogCollection` entity, so it appears in the
 * existing BlogCollection-typed Studio query fields (e.g. "Blog Post Collection
 * With Posts") and reuses the `blog/collection/posts` link — no `BlogTopic`
 * entity and no ui-app changes required.
 *
 * The handler resolves the topic by slug and fills the blog-collection
 * passthrough with the topic; the shared posts link then filters by the topic
 * relation for this id (see `blogPostsTopicSourceToken`).
 */
export const BlogPostsByTopic = defineQueryToken('blog/posts-by-topic', {
  entity: 'BlogCollection',
  type: 'single',
  label: 'Blog Posts by Topic',
  input: z.object({ slug: z.string() }),
});
