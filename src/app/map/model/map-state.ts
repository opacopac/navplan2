import {Position2d} from '../../shared/model/geometry/position2d';
import {Angle} from '../../shared/model/quantities/angle';
import {Extent} from '../../shared/model/extent';
import {MapbaselayerType} from './mapbaselayer-factory';
import {DataItem} from '../../shared/model/data-item';


export interface MapOverlayState {
    dataItem: DataItem;
    clickPos: Position2d;
}


export interface MapState {
    position: Position2d;
    zoom: number;
    rotation: Angle;
    extent: Extent;
    baseMapType: MapbaselayerType;
    showOverlay: MapOverlayState;
}
