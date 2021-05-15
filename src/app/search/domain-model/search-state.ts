import {TextSearchState} from './text-search-state';
import {PositionSearchState} from './position-search-state';


export interface SearchState {
    textSearchState: TextSearchState;
    positionSearchState: PositionSearchState;
}
