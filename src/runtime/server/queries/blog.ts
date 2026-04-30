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
