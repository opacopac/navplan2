import {SearchItem} from './search-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';


export interface PositionSearchState {
    searchItems: SearchItem[];
    clickPos: Position2d;
}
