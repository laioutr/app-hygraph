import { BlogCollectionBySlug } from '@laioutr-core/canonical-types/blog';
import { defineHygraph } from '../../middleware/defineHygraph';

export default defineHygraph.queryTemplateProvider({
  for: BlogCollectionBySlug,
  run: async () => [
    {
      input: { slug: 'hygraph' },
      label: 'Hygraph Blog',
    },
  ],
});
