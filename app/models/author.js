import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import {
  fragment,
  fragmentArray,
  array,
} from 'ember-data-model-fragments/attributes';

export default class AuthorModel extends Model {
  @belongsTo('profile') profile;
  @hasMany('blog-post') blogPosts;

  @fragment('name') name;
  @fragmentArray('address') addresses;
  @array('string') titles;

  @computed('name.first', 'name.last')
  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}
