import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';

export default class AddressFragment extends Fragment {
  @attr('string') city;
  @attr('string') country;
}
