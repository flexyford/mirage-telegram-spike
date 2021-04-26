import { getContext } from '@ember/test-helpers';
import { dasherize } from '@ember/string';
import { run } from '@ember/runloop';
import { setupMirage as _setupMirage } from 'ember-cli-mirage/test-support';

// Here is another solution from an open PR in mirage
// that is more flexible than the solution provided below
// https://github.com/miragejs/ember-cli-mirage/pull/2001/files
export function pushMirageIntoStore(mirageModels = null) {
  let context = getContext();
  let schema = context.server.schema;

  if (!mirageModels) {
    // push mirage db into store
    Object.keys(schema)
      .filter((key) => schema[key].all !== undefined) // Get the resources
      .forEach((resource) => {
        pushMirageModelsIntoStore(schema[resource].all());
      });
  } else {
    pushMirageModelsIntoStore(mirageModels);
  }
}

function pushMirageModelsIntoStore(models) {
  let context = getContext();
  let store = context.owner.lookup('service:store');

  let modelName = models.modelName;
  let serializer = context.server.serializerOrRegistry.serializerFor(modelName);

  let json = serializer.serialize(models);

  run(() => {
    store.pushPayload(json);
  });
}
