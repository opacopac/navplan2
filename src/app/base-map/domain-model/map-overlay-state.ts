import {Position2d} from '../../geo-math/domain-model/geometry/position2d';
import {DataItem} from '../../shared/model/data-item';


export interface MapOverlayState {
    dataItem: DataItem;
    clickPos: Position2d;
}
