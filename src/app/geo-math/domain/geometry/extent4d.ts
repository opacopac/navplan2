import {Extent3d} from './extent3d';
import {Timestamp} from '../quantities/timestamp';
import {Clonable} from '../../../system/domain/clonable';
import {Altitude} from './altitude';


export class Extent4d extends Extent3d implements Clonable<Extent4d> {
    public constructor(
        minLon: number,
        minLat: number,
        minAlt: Altitude,
        public minTimestamp: Timestamp,
        maxLon: number,
        maxLat: number,
        maxAlt: Altitude,
        public maxTimestamp: Timestamp,
    ) {
        super(minLon, minLat, minAlt, maxLon, maxLat, maxAlt);
    }


    public clone(): Extent4d {
        return new Extent4d(
            this.minLon,
            this.minLat,
            this.minAlt,
            this.minTimestamp,
            this.maxLon,
            this.maxLat,
            this.maxAlt,
            this.maxTimestamp
        );
    }
}
