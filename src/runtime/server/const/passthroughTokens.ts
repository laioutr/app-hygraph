import { createPassthroughToken } from '#imports';
import type { BlogCollectionBySlugQuery, BlogFragment } from '../generated/graphql';

type BlogCollection = NonNullable<BlogCollectionBySlugQuery['blogCollection']>;

export const blogCollectionToken = createPassthroughToken<BlogCollection>('hygraph/blog-collection');
export const blogPostsToken = createPassthroughToken<BlogFragment[]>('hygraph/blog-posts');
