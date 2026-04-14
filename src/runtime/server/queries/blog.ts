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
  query Blogs($skip: Int, $first: Int, $collectionId: ID) {
    blogs(skip: $skip, first: $first, orderBy: createdAt_DESC, where: { blogCollection: { id: $collectionId } }) {
      ...Blog
    }
    blogsConnection(where: { blogCollection: { id: $collectionId } }) {
      aggregate {
        count
      }
    }
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query BlogPostBySlug($slug: String!) {
    blog(where: { slug: $slug }) {
      ...Blog
    }
  }
`;

export const BLOG_COLLECTION_BY_SLUG_QUERY = /* GraphQL */ `
  #graphql
  query BlogCollectionBySlug($slug: String!) {
    blogCollection(where: { slug: $slug }) {
      id
      slug
      title
    }
  }
`;

export const BLOG_COLLECTIONS_QUERY = /* GraphQL */ `
  #graphql
  query BlogCollections {
    blogCollections {
      slug
      title
    }
  }
`;
