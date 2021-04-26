import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  afterCreate(author, server) {
    if (!author.name) {
      author.update({
        name: { first: 'Ember', last: 'Tomster' },
      });
    }
  },
});
