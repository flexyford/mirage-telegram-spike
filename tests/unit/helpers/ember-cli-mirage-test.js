import Model from '@ember-data/model';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { pushMirageIntoStore } from 'mirage-experiment/tests/helpers/ember-cli-mirage';

module('Unit | Helpers | ember cli mirage', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('one-to-many relationship', function (assert) {
    let schema = this.server.schema;
    // SETUP MIRAGE SERVER
    // this.server.create('author', 'withBlogPosts'),
    this.server.createList('blog-post', 3, {
      author: this.server.create('author'),
    });

    // PUSH AUTHOR MIRAGE MODELS/COLLECTIONS
    // Implicitly pushes blog posts into data store because they are embedded in the json payload
    pushMirageIntoStore(schema.authors.first());

    // PEEK MODELS
    let store = this.owner.lookup('service:store');
    let author = store.peekRecord('author', '1');
    let blogPost = store.peekRecord('blogPost', '1');

    assert.equal(
      author.hasMany('blogPosts').ids().length,
      3,
      'association present'
    );

    assert.equal(
      author.hasMany('blogPosts').value().length,
      3,
      'blog posts are in the ember data store'
    );

    assert.equal(blogPost.belongsTo('author').value(), author);
  });
});
