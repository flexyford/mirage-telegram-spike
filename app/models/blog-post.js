import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BlogPostModel extends Model {
  @belongsTo('author') author;
  @hasMany('tag') tags;

  @attr('boolean') isPublished;
  @attr('date') publishedAt;
  @attr('string') title;
}
