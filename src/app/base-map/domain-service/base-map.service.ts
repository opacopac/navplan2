import {Extent2d} from '../../geo-math/domain-model/geometry/extent2d';
import {Position2d} from '../../geo-math/domain-model/geometry/position2d';
import {Angle} from '../../geo-math/domain-model/quantities/angle';


export interface BaseMapService {
    getZoom(): number;

    setZoom(zoom: number);

    zoomIn();

    zoomOut();

    getMapPosition(): Position2d;

    setPosition(position: Position2d, zoom?: number);

    getRotation(): Angle;

    getExtent(): Extent2d;

    getRadiusDegByPixel(position: Position2d, radiusPixel: number): number;
}
