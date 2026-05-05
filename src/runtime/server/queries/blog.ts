import { AssetFragment } from './asset';

const BlogTaxonomyFragment = /* GraphQL */ `
  #graphql
  fragment BlogTaxonomy on Blog {
    topics {
      slug
      title
    }
    formats {
      slug
      title
    }
    audiences {
      slug
      title
    }
  }
`;

const BlogFragment = /* GraphQL */ `
  #graphql
  ${AssetFragment}
  ${BlogTaxonomyFragment}
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
    ...BlogTaxonomy
  }
`;

export const BLOGS_QUERY = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query Blogs($skip: Int, $first: Int, $collectionId: ID) {
    blogs(skip: $skip, first: $first, orderBy: createdAt_DESC, where: { blogCollection: { id: $collectionId } }) {
      ...Blog
    }
    blogsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const BLOG_LISTING_QUERY = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query BlogListing(
    $first: Int = 24
    $skip: Int = 0
    $orderBy: BlogOrderByInput = publishedAt_DESC
    $where: BlogWhereInput
  ) {
    blogs(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
      ...Blog
    }
    blogsConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const BLOG_TAXONOMIES_QUERY = /* GraphQL */ `
  #graphql
  query BlogTaxonomies {
    topics(first: 100, orderBy: title_ASC) {
      slug
      title
    }
    formats(first: 50, orderBy: title_ASC) {
      slug
      title
    }
    audiences(first: 50, orderBy: title_ASC) {
      slug
      title
    }
  }
`;

export const RELATED_BLOGS_QUERY = /* GraphQL */ `
  #graphql
  ${BlogFragment}
  query RelatedBlogs($topicSlug: String!, $excludeSlug: String!, $first: Int = 4) {
    blogs(
      first: $first
      orderBy: publishedAt_DESC
      where: { topics_some: { slug: $topicSlug }, slug_not: $excludeSlug }
    ) {
      ...Blog
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
