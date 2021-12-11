import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import {PositionSearchResultList} from './position-search-result-list';


export interface PositionSearchState {
    positionSearchResults: PositionSearchResultList;
    clickPos: Position2d;
}
