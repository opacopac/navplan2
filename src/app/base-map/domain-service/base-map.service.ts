import {Extent2d} from '../../geo-math/domain-model/geometry/extent2d';
import {Position2d} from '../../geo-math/domain-model/geometry/position2d';
import {Angle} from '../../geo-math/domain-model/quantities/angle';
import {Injectable} from '@angular/core';


@Injectable()
export abstract class BaseMapService {
    public abstract getZoom(): number;

    public abstract setZoom(zoom: number);

    public abstract zoomIn();

    public abstract zoomOut();

    public abstract getMapPosition(): Position2d;

    public abstract setPosition(position: Position2d, zoom?: number);

    public abstract getRotation(): Angle;

    public abstract getExtent(): Extent2d;

    public abstract getRadiusDegByPixel(position: Position2d, radiusPixel: number): number;
}
