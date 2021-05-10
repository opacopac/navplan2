import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {DataItem} from '../../common/model/data-item';


export interface MapOverlayState {
    dataItem: DataItem;
    clickPos: Position2d;
}
