import {Extent2d} from './extent2d';
import {Clonable} from '../../../system/domain-model/clonable';
import {Altitude} from './altitude';
import {Position3d} from './position3d';


export class Extent3d extends Extent2d implements Clonable<Extent3d> {
    public constructor(
        minLon: number,
        minLat: number,
        public minAlt: Altitude,
        maxLon: number,
        maxLat: number,
        public maxAlt: Altitude
    ) {
        super(minLon, minLat, maxLon, maxLat);
    }


    public clone(): Extent3d {
        return new Extent3d(
            this.minLon,
            this.minLat,
            this.minAlt.clone(),
            this.maxLon,
            this.maxLat,
            this.maxAlt.clone()
        );
    }


    public containsPoint3d(point: Position3d): boolean {
        return (this.containsPoint2d(point)
            && point.altitude.isHigherOrEqual(this.minAlt)
            && point.altitude.isLowerOrEqual(this.maxAlt)
        );
    }
}
