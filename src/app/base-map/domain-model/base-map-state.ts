import {Position2d} from '../../geo-math/domain-model/geometry/position2d';
import {Angle} from '../../geo-math/domain-model/quantities/angle';
import {Extent2d} from '../../geo-math/domain-model/geometry/extent2d';
import {MapbaselayerType} from '../ol-model/ol-baselayer-factory';
import {DataItem} from '../../shared/model/data-item';


export interface MapOverlayState {
    dataItem: DataItem;
    clickPos: Position2d;
}


export interface BaseMapState {
    position: Position2d;
    zoom: number;
    rotation: Angle;
    extent: Extent2d;
    baseMapType: MapbaselayerType;
    showOverlay: MapOverlayState;
}
