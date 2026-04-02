import { AssetFragment } from './asset';

export const MEDIA_LIBRARY_LIST_QUERY = /* GraphQL */ `
  #graphql
  ${AssetFragment}
  query MediaLibraryList($skip: Int, $first: Int, $search: String) {
    assets(skip: $skip, first: $first, orderBy: createdAt_DESC, where: { _search: $search }) {
      ...Asset
    }
  }
`;
