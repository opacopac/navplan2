import {TextSearchState} from '../../domain/model/text-search-state';
import {PositionSearchState} from '../../domain/model/position-search-state';


export interface SearchState {
    textSearchState: TextSearchState;
    positionSearchState: PositionSearchState;
}
