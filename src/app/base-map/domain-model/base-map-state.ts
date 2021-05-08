import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {MapOverlayState} from './map-overlay-state';
import {MapBaseLayerType} from './map-base-layer-type';
import {ShowImageState} from './show-image-state';


export interface BaseMapState {
    position: Position2d;
    zoom: number;
    rotation: Angle;
    extent: Extent2d;
    baseMapType: MapBaseLayerType;
    showOverlay: MapOverlayState;
    showImage: ShowImageState;
}
