import z from 'zod/v4';
import { defineEntityComponentToken, defineLinkToken, defineQueryToken } from '@laioutr-core/core-types/orchestr';

/**
 * Local stand-ins for the blog-topic tokens that do not exist in
 * `@laioutr-core/canonical-types` yet (neither `entity/blog-topic` nor the
 * topic tokens on `/blog`). These mirror the published blog-collection
 * equivalents one-to-one, so they can be lifted into the package unchanged
 * once it grows a topic surface.
 */

export const BlogTopicBase = defineEntityComponentToken('base', {
  entityType: 'BlogTopic',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
  }),
});

export const BlogTopicBySlug = defineQueryToken('blog/topic/by-slug', {
  entity: 'BlogTopic',
  type: 'single',
  label: 'Blog topic by slug',
  input: z.object({ slug: z.string() }),
});

export class BlogTopicBySlugNotFoundError extends Error {
  static code = 'BLOG_TOPIC_NOT_FOUND';

  readonly code = BlogTopicBySlugNotFoundError.code;
  readonly slug: string;

  constructor(slug: string) {
    super(`Blog Topic with slug ${slug} not found`);
    this.name = 'BlogTopicBySlugNotFoundError';
    this.slug = slug;
  }
}

export const BlogTopicPostsLink = defineLinkToken('blog/topic/posts', {
  label: 'Blog topic posts',
  source: 'BlogTopic',
  target: 'BlogPost',
  type: 'multi',
  defaultLimit: 12,
});
