import { AssetFragment } from './asset';

export const MediaLibraryListQuery = /* GraphQL */ `
  #graphql
  ${AssetFragment}
  query MediaLibraryList($skip: Int, $first: Int, $search: String) {
    assets(skip: $skip, first: $first, orderBy: createdAt_DESC, where: { _search: $search }) {
      ...Asset
    }
  }
`;
