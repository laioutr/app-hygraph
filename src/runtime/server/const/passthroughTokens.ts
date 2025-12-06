import { createPassthroughToken } from '#imports';

export const blogPostsToken = createPassthroughToken<any[]>('hygraph/blog-posts');
