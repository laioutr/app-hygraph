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
  query Blogs($skip: Int, $first: Int, $collectionId: ID, $locales: [Locale!]!) {
    blogs(
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
      where: { blogCollection: { id: $collectionId } }
      locales: $locales
    ) {
      ...Blog
    }
    blogsConnection(where: { blogCollection: { id: $collectionId } }, locales: $locales) {
      aggregate {
        count
      }
    }
  }
`;

export const BLOGS_BY_TOPIC_QUERY = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query BlogsByTopic($skip: Int, $first: Int, $topicId: ID, $locales: [Locale!]!) {
    blogs(
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
      where: { topics_some: { id: $topicId } }
      locales: $locales
    ) {
      ...Blog
    }
    blogsConnection(where: { topics_some: { id: $topicId } }, locales: $locales) {
      aggregate {
        count
      }
    }
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query BlogPostBySlug($slug: String!, $locales: [Locale!]!) {
    blog(where: { slug: $slug }, locales: $locales) {
      ...Blog
    }
  }
`;

export const BLOG_COLLECTION_BY_SLUG_QUERY = /* GraphQL */ `
  #graphql
  query BlogCollectionBySlug($slug: String!, $locales: [Locale!]!) {
    blogCollection(where: { slug: $slug }, locales: $locales) {
      id
      slug
      title
    }
  }
`;

export const BLOG_COLLECTIONS_QUERY = /* GraphQL */ `
  #graphql
  query BlogCollections($locales: [Locale!]!) {
    blogCollections(locales: $locales) {
      slug
      title
    }
  }
`;

export const BLOG_TOPIC_BY_SLUG_QUERY = /* GraphQL */ `
  #graphql
  query BlogTopicBySlug($slug: String!, $locales: [Locale!]!) {
    topic(where: { slug: $slug }, locales: $locales) {
      id
      slug
      title
    }
  }
`;

export const BLOG_TOPICS_QUERY = /* GraphQL */ `
  #graphql
  query BlogTopics($locales: [Locale!]!, $first: Int, $where: TopicWhereInput) {
    topics(locales: $locales, first: $first, where: $where) {
      slug
      title
    }
  }
`;
