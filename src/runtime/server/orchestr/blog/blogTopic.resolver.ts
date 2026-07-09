import { BlogTopicBase } from '../../../shared/tokens/blog-topic';
import { blogTopicToken } from '../../const/passthroughTokens';
import { defineHygraph } from '../../middleware/defineHygraph';

export default defineHygraph.componentResolver({
  entityType: 'BlogTopic',
  label: 'Blog Topic',
  provides: [BlogTopicBase],
  resolve: async ({ passthrough, $entity }) => {
    const topic = passthrough.require(blogTopicToken);

    return {
      entities: [
        $entity({
          id: topic.id,
          base: {
            slug: topic.slug,
            title: topic.title,
          },
        }),
      ],
    };
  },
});
