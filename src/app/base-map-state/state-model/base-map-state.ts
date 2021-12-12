import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import {Angle} from '../../geo-physics/domain-model/quantities/angle';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {MapBaseLayerType} from '../../base-map/domain-model/map-base-layer-type';
import {ShowImageState} from './show-image-state';


export interface BaseMapState {
    position: Position2d;
    zoom: number;
    rotation: Angle;
    extent: Extent2d;
    baseMapType: MapBaseLayerType;
    showImage: ShowImageState;
}
