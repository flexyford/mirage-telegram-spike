import { Factory, trait } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `BlogPost ${i}`;
  },

  isPublished: false,

  published: trait({
    isPublished: true,
    publishedAt() {
      return new Date().toISOString();
    },
  }),

  afterCreate(post, server) {
    if (!post.author) {
      post.update({
        author: server.create('author'),
      });
    }
  },
});
