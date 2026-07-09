import { createPassthroughToken } from '#imports';
import type { BlogCollectionBySlugQuery, BlogFragment } from '../generated/graphql';

type BlogCollection = NonNullable<BlogCollectionBySlugQuery['blogCollection']>;

export const blogCollectionToken = createPassthroughToken<BlogCollection>('hygraph/blog-collection');
export const blogPostsToken = createPassthroughToken<BlogFragment[]>('hygraph/blog-posts');

/**
 * Ids that the `blog/collection/posts` link should resolve via the topic
 * relation (`topics_some`) instead of the blog-collection relation. Set by the
 * "Blog Posts by Topic" query, which exposes a topic as a BlogCollection entity.
 */
export const blogPostsTopicSourceToken = createPassthroughToken<Set<string>>('hygraph/blog-posts-topic-source');
