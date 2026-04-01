import { BlogPostBySlug, BlogPostBySlugNotFoundError } from '@laioutr-core/canonical-types/blog';
import type { BlogPostBySlugQuery } from '../../generated/graphql';
import { blogPostsToken } from '../../const/passthroughTokens';
import { defineHygraph } from '../../middleware/defineHygraph';
import { BLOG_POST_BY_SLUG_QUERY } from '../../queries/blog';

export default defineHygraph.queryHandler({
  implements: BlogPostBySlug,
  run: async ({ context, input, passthrough }) => {
    const result = await context.hygraph.request<BlogPostBySlugQuery>(BLOG_POST_BY_SLUG_QUERY, {
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
