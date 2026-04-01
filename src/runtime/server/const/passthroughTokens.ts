import { createPassthroughToken } from '#imports';
import type { BlogFragment } from '../generated/graphql';

export const blogPostsToken = createPassthroughToken<BlogFragment[]>('hygraph/blog-posts');
