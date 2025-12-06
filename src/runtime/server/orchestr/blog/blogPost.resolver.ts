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
      entities: posts.map((post: any) =>
        $entity({
          id: post.id,
          base: {
            slug: post.slug,
            title: post.title,
            publishedAt: new Date(post.publishedAt),
          },
          content: {
            content: { html: post.content.html },
          },
          excerpt: {
            excerpt: { html: post.content.html.slice(0, 100) },
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
