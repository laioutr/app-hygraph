import { BlogCollectionBase } from '@laioutr-core/canonical-types/entity/blog-collection';
import { blogCollectionToken } from '../../const/passthroughTokens';
import { defineHygraph } from '../../middleware/defineHygraph';

export default defineHygraph.componentResolver({
  entityType: 'BlogCollection',
  label: 'Blog Collection',
  provides: [BlogCollectionBase],
  resolve: async ({ passthrough, $entity }) => {
    const collection = passthrough.require(blogCollectionToken);

    return {
      entities: [
        $entity({
          id: collection.id,
          base: {
            slug: collection.slug,
            title: collection.title,
          },
        }),
      ],
    };
  },
});
