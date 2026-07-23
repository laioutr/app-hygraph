import { AssetFragment } from './asset';

// `$stage` is declared even though the media library always reads published assets: the client
// injects the variable into every request without inspecting the document, so an operation that
// omits it would be rejected as an unknown variable.
// `where` is passed as a variable so the picker's browse mode (no search term) can send an empty
// filter. Inlining `where: { _search: $search }` sends `_search: null` when the term is absent, and
// Hygraph treats that as "match nothing" rather than "no filter" — so browse returned zero assets
// until the user typed a search. The provider builds `{ _search }` only when a term is present.
export const MEDIA_LIBRARY_LIST_QUERY = /* GraphQL */ `
  #graphql
  ${AssetFragment}
  query MediaLibraryList($skip: Int, $first: Int, $where: AssetWhereInput, $stage: Stage = PUBLISHED) {
    assets(skip: $skip, first: $first, orderBy: createdAt_DESC, where: $where, stage: $stage) {
      ...Asset
    }
  }
`;
