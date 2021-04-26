import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';

export default class NameFragment extends Fragment {
  @attr('string') first;
  @attr('string') last;
}
