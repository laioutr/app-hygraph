import { BlogCollectionBySlug } from '@laioutr-core/canonical-types/blog';
import { defineHygraph } from '../../middleware/defineHygraph';

export default defineHygraph.queryHandler({
  implements: BlogCollectionBySlug,
  run: async ({ input }) => ({
    id: input.slug,
  }),
});
