import { BlogPostBase, BlogPostContent, BlogPostExcerpt, BlogPostMedia } from '@laioutr-core/canonical-types/entity/blog-post';
import { blogPostsToken } from '../../const/passthroughTokens';
import { mapHygraphMedia } from '../../hygraph-utils/mediaMapper';
import { defineHygraph } from '../../middleware/defineHygraph';

export default defineHygraph.componentResolver({
  entityType: 'BlogPost',
  label: 'Blog Post',
  provides: [BlogPostBase, BlogPostExcerpt, BlogPostContent, BlogPostMedia],
  resolve: async ({ passthrough, $entity }) => {
    const posts = passthrough.require(blogPostsToken);

    return {
      entities: posts.map((post) =>
        $entity({
          id: post.id,
          base: {
            slug: post.slug,
            title: post.title,
            publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
          },
          content: {
            content: { html: post.content.html },
          },
          excerpt: () => {
            const content = post.content.html.replace(/<[^>]*>/g, '');
            const excerpt = content.slice(0, 100) + (content.length > 100 ? '…' : '');

            return {
              excerpt: { html: excerpt },
            };
          },
          media: {
            image:
              post.image ? mapHygraphMedia(post.image) : { type: 'image', sources: [{ provider: 'none', src: '/placeholders/1x1.svg' }] },
          },
        })
      ),
    };
  },
});
