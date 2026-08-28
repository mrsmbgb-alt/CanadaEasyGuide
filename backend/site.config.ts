import { defineConfig, contentType, field } from 'koguma';

export default defineConfig({
  siteName: 'Immigration Guide',
  contentTypes: [
    contentType({
      id: 'post',
      name: 'Blog Post',
      displayField: 'title',
      fields: {
        title: field.text('Title').required(),
        slug: field.text('Slug').required(),
        body: field.markdown('Body'),
        heroImage: field.image('Hero Image'),
        published: field.boolean('Published').default(false),
        date: field.date('Published Date')
      }
    })
  ],
  // Cloudflare D1 + R2 কনফিগার (অটো হবে)
});
