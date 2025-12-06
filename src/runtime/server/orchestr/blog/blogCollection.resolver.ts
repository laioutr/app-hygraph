import { BlogCollectionBase } from '@laioutr-core/canonical-types/entity/blog-collection';
import { defineHygraph } from '../../middleware/defineHygraph';

export default defineHygraph.componentResolver({
  entityType: 'BlogCollection',
  label: 'Blog Collection',
  provides: [BlogCollectionBase],
  resolve: async ({ entityIds, $entity }) => ({
    entities: entityIds.map((id) =>
      $entity({
        id,
        base: {
          slug: 'blog',
          title: 'Blog',
        },
      })
    ),
  }),
});
