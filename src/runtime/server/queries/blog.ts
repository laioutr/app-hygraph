import { AssetFragment } from './asset';

const BlogFragment = /* GraphQL */ `
  #graphql
  ${AssetFragment}
  fragment Blog on Blog {
    id
    title
    slug
    content {
      html
    }
    image {
      ...Asset
    }
    publishedAt
    metaTitle
    metaDescription
  }
`;

export const BLOGS_QUERY = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query Blogs($skip: Int, $first: Int, $collectionId: ID, $locales: [Locale!]!, $stage: Stage = PUBLISHED) {
    blogs(
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
      where: { blogCollection: { id: $collectionId } }
      locales: $locales
      stage: $stage
    ) {
      ...Blog
    }
    blogsConnection(where: { blogCollection: { id: $collectionId } }, locales: $locales, stage: $stage) {
      aggregate {
        count
      }
    }
  }
`;

export const BLOGS_BY_TOPIC_QUERY = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query BlogsByTopic($skip: Int, $first: Int, $topicId: ID, $locales: [Locale!]!, $stage: Stage = PUBLISHED) {
    blogs(
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
      where: { topics_some: { id: $topicId } }
      locales: $locales
      stage: $stage
    ) {
      ...Blog
    }
    blogsConnection(where: { topics_some: { id: $topicId } }, locales: $locales, stage: $stage) {
      aggregate {
        count
      }
    }
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query BlogPostBySlug($slug: String!, $locales: [Locale!]!, $stage: Stage = PUBLISHED) {
    blog(where: { slug: $slug }, locales: $locales, stage: $stage) {
      ...Blog
    }
  }
`;

export const BLOG_COLLECTION_BY_SLUG_QUERY = /* GraphQL */ `
  #graphql
  query BlogCollectionBySlug($slug: String!, $locales: [Locale!]!, $stage: Stage = PUBLISHED) {
    blogCollection(where: { slug: $slug }, locales: $locales, stage: $stage) {
      id
      slug
      title
    }
  }
`;

export const BLOG_COLLECTIONS_QUERY = /* GraphQL */ `
  #graphql
  query BlogCollections($locales: [Locale!]!, $stage: Stage = PUBLISHED) {
    blogCollections(locales: $locales, stage: $stage) {
      slug
      title
    }
  }
`;

export const BLOG_TOPIC_BY_SLUG_QUERY = /* GraphQL */ `
  #graphql
  query BlogTopicBySlug($slug: String!, $locales: [Locale!]!, $stage: Stage = PUBLISHED) {
    topic(where: { slug: $slug }, locales: $locales, stage: $stage) {
      id
      slug
      title
    }
  }
`;

export const BLOG_TOPICS_QUERY = /* GraphQL */ `
  #graphql
  query BlogTopics($locales: [Locale!]!, $first: Int, $where: TopicWhereInput, $stage: Stage = PUBLISHED) {
    topics(locales: $locales, first: $first, where: $where, stage: $stage) {
      slug
      title
    }
  }
`;
