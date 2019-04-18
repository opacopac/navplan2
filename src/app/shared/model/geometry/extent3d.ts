import {Extent2d} from './extent2d';
import {Length} from '../quantities/length';
import {Clonable} from '../clonable';
import {Position3d} from './position3d';


export class Extent3d extends Extent2d implements Clonable<Extent3d> {
    public constructor(
        minLon: number,
        minLat: number,
        public minHeight: Length,
        maxLon: number,
        maxLat: number,
        public maxHeight: Length
    ) {
        super(minLon, minLat, maxLon, maxLat);
    }


    clone(): Extent3d {
        return new Extent3d(
            this.minLon,
            this.minLat,
            this.minHeight.clone(),
            this.maxLon,
            this.maxLat,
            this.maxHeight.clone()
        );
    }


    containsPoint(point: Position3d): boolean {
        const pointFt = point.altitude ? point.altitude.ft : 0;

        return (super.containsPoint(point)
            && pointFt >= this.minHeight.ft
            && pointFt <= this.maxHeight.ft
        );
    }
}
