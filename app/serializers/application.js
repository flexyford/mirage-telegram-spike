import RESTSerializer from '@ember-data/serializer/rest';
import { isArray } from '@ember/array';
import { decamelize, underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default RESTSerializer.extend({
  serialize(snapshot, options = {}) {
    options.includeId = true;
    return this._super(snapshot, options);
  },
  keyForAttribute(attr) {
    return decamelize(attr);
  },
  keyForRelationship(attr) {
    return decamelize(attr);
  },
});
