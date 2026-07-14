import { AssetFragment } from './asset';

// `where` is passed as a variable so the picker's browse mode (no search term) can send an empty
// filter. Inlining `where: { _search: $search }` sends `_search: null` when the term is absent, and
// Hygraph treats that as "match nothing" rather than "no filter" — so browse returned zero assets
// until the user typed a search. The provider builds `{ _search }` only when a term is present.
export const MEDIA_LIBRARY_LIST_QUERY = /* GraphQL */ `
  #graphql
  ${AssetFragment}
  query MediaLibraryList($skip: Int, $first: Int, $where: AssetWhereInput) {
    assets(skip: $skip, first: $first, orderBy: createdAt_DESC, where: $where) {
      ...Asset
    }
  }
`;
