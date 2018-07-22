import {Position2d} from '../../shared/model/geometry/position2d';
import {Angle} from '../../shared/model/quantities/angle';
import {Extent} from '../../shared/model/extent';
import {MapbaselayerType} from './mapbaselayer-factory';
import {DataItem} from '../../shared/model/data-item';


export interface MapState {
    position: Position2d;
    zoom: number;
    rotation: Angle;
    extent: Extent;
    baseMapType: MapbaselayerType;
    selectedDataItem: DataItem;
    clickPos: Position2d;
}
