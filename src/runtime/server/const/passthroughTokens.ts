import { createPassthroughToken } from '#imports';
import type { BlogCollectionBySlugQuery, BlogFragment, BlogTopicBySlugQuery } from '../generated/graphql';

type BlogCollection = NonNullable<BlogCollectionBySlugQuery['blogCollection']>;
type BlogTopic = NonNullable<BlogTopicBySlugQuery['topic']>;

export const blogCollectionToken = createPassthroughToken<BlogCollection>('hygraph/blog-collection');
export const blogTopicToken = createPassthroughToken<BlogTopic>('hygraph/blog-topic');
export const blogPostsToken = createPassthroughToken<BlogFragment[]>('hygraph/blog-posts');
