import {TextSearchState} from '../../search/domain-model/text-search-state';
import {PositionSearchState} from '../../search/domain-model/position-search-state';


export interface SearchState {
    textSearchState: TextSearchState;
    positionSearchState: PositionSearchState;
}
