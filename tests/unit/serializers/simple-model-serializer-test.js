import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { Model, hasMany, belongsTo } from 'miragejs';
import { EmberDataSerializer } from 'ember-cli-mirage';
import { getContext } from '@ember/test-helpers';
import { pushMirageIntoStore } from 'mirage-experiment/tests/helpers/ember-cli-mirage';
import DsModel from '@ember-data/model';
import Server from 'ember-cli-mirage/server';

module('Unit | Serializer | simple model serializer', function (hooks) {
  setupTest(hooks);

  class SimpleModel {
    constructor(attributes) {
      Object.assign(this, { ...attributes });
    }
  }

  let SimpleModelSerializer = EmberDataSerializer.extend({
    root: false,
    embed: true,
  });

  // Example Helper to create class instances using mirage models
  function makeSimpleModel(models) {
    let json = server.serializerOrRegistry.serialize(models);
    return new SimpleModel(json);
  }

  let server, store;
  let address, wordSmith;

  hooks.beforeEach(function () {
    store = this.owner.lookup('service:store');
    server = new Server({
      environment: 'test',
      models: {
        address: Model,
        wordSmith: Model.extend({
          blogPosts: hasMany(),
          address: belongsTo(),
        }),
        blogPost: Model.extend({
          wordSmith: belongsTo(),
        }),
      },
      serializers: {
        application: SimpleModelSerializer,
        wordSmith: SimpleModelSerializer.extend({
          transforms: {
            address: { serialize: 'records', deserialize: 'records' },
          },
        }),
        blogPost: SimpleModelSerializer,
      },
    });

    address = server.create('address', {
      id: '11',
      street: '123 maple',
    });

    wordSmith = server.create('word-smith', {
      id: 1,
      name: 'Zelda',
      age: 230,
      address: address,
    });

    server.create('blog-post', {
      id: 2,
      wordSmith: wordSmith,
    });
  });

  hooks.afterEach(function () {
    server.shutdown();
  });

  test('serializes a simple model', function (assert) {
    let wordSmithSimpleModel = makeSimpleModel(wordSmith);

    assert.ok(
      wordSmithSimpleModel instanceof SimpleModel,
      'builds a SimpleModel instance'
    );

    let expected = {
      address: {
        id: '11',
        street: '123 maple',
      },
      age: 230,
      blogPosts: ['2'],
      id: '1',
      name: 'Zelda',
    };

    Object.keys(expected).forEach((key) => {
      assert.deepEqual(wordSmithSimpleModel[key], expected[key]);
    });
  });
});
