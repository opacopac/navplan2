import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {PositionSearchResultList} from './position-search-result-list';


export interface PositionSearchState {
    positionSearchResults: PositionSearchResultList;
    clickPos: Position2d;
}
