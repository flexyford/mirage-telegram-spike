import { EmberDataSerializer } from 'ember-cli-mirage';
import { decamelize, underscore } from '@ember/string';

export default EmberDataSerializer.extend({
  root: true,
  embed: false,

  keyForAttribute(attr) {
    return decamelize(attr);
  },

  keyForRelationship(attr) {
    return decamelize(attr);
  },

  keyForRelationshipIds(attr) {
    return decamelize(attr);
  },

  keyForEmbeddedRelationship(attr) {
    return decamelize(attr);
  },
});
