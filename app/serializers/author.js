import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class AuthorSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    /**
     * Mirage does not recognize 'embedded' key
     * In ember data { embedded: 'always' } is shorthand for: { serialize: 'records', deserialize: 'records' }
     * https://api.emberjs.com/ember-data/3.26/classes/EmbeddedRecordsMixin/methods/serializeHasMany?anchor=serializeHasMany
     **/
    // blogPosts: { embedded: 'always' },
    blogPosts: { serialize: 'records', deserialize: 'records' },
    profile: { key: 'user_profile_id' },
  };
}
