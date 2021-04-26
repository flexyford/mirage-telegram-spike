import {
  createServer,
  discoverEmberDataModels,
  applyEmberDataSerializers,
} from 'ember-cli-mirage';

export default function () {
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */
}

export function makeServer(config) {
  return createServer({
    ...config,
    models: { ...discoverEmberDataModels(), ...config.models },
    serializers: applyEmberDataSerializers(config.serializers),
  });
}
