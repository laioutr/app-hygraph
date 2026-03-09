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

export const BlogsQuery = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query Blogs($skip: Int, $first: Int) {
    blogs(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      ...Blog
    }
  }
`;

export const BlogsByCollectionSlugQuery = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query BlogsByCollectionSlug($collectionSlug: String!, $skip: Int, $first: Int) {
    blogs(
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
      where: { collection: { slug: $collectionSlug } }
    ) {
      ...Blog
    }
  }
`;

export const BlogPostBySlugQuery = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query BlogPostBySlug($slug: String!) {
    blog(where: { slug: $slug }) {
      ...Blog
    }
  }
`;
