import {Position2d} from '../../shared/model/geometry/position2d';
import {Angle} from '../../shared/model/quantities/angle';
import {Extent2d} from '../../shared/model/geometry/extent2d';
import {MapbaselayerType} from './ol-baselayer-factory';
import {DataItem} from '../../shared/model/data-item';


export interface MapOverlayState {
    dataItem: DataItem;
    clickPos: Position2d;
}


export interface OlMapState {
    position: Position2d;
    zoom: number;
    rotation: Angle;
    extent: Extent2d;
    baseMapType: MapbaselayerType;
    showOverlay: MapOverlayState;
}
