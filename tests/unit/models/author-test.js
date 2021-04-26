import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { applyEmberDataSerializers } from 'ember-cli-mirage';

module('Unit | Model | author', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('embeds records based on app/serializers/author', function (assert) {
    let author = this.server.create('author', {
      blogPosts: this.server.createList('blogPost', 3),
    });

    let authorJson = this.server.serializerOrRegistry.serialize(author);

    assert.deepEqual(authorJson, {
      author: {
        id: '4',
        name: {
          first: 'Ember',
          last: 'Tomster',
        },
        user_profile_id: null,
        blogPosts: [
          {
            author: '4',
            id: '1',
            is_published: false,
            tags: [],
            title: 'BlogPost 0',
          },
          {
            author: '4',
            id: '2',
            is_published: false,
            tags: [],
            title: 'BlogPost 1',
          },
          {
            author: '4',
            id: '3',
            is_published: false,
            tags: [],
            title: 'BlogPost 2',
          },
        ],
      },
    });
  });
});
