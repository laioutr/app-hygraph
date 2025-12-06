import { BlogPostBySlug, BlogPostBySlugNotFoundError } from '@laioutr-core/canonical-types/blog';
import { blogPostsToken } from '../../const/passthroughTokens';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BlogPostBySlugQuery } from '../../queries/blog';

export default defineHygraph.queryHandler({
  implements: BlogPostBySlug,
  run: async ({ context, input, passthrough }) => {
    const result = await context.hygraph.request(BlogPostBySlugQuery, {
      slug: input.slug,
    });

    const post = result.data.blog;

    if (!post) {
      throw new BlogPostBySlugNotFoundError(input.slug);
    }

    passthrough.set(blogPostsToken, [post]);

    return {
      id: post.id,
    };
  },
});
