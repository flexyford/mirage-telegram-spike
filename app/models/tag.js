import Model, { hasMany } from '@ember-data/model';

export default class TagModel extends Model {
  @hasMany('blog-post') blogPosts;
}
