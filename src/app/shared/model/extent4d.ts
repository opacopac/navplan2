import {Length} from './quantities/length';
import {Extent3d} from './extent3d';
import {Timestamp} from './quantities/timestamp';
import {Clonable} from './clonable';


export class Extent4d extends Extent3d implements Clonable<Extent4d> {
    public constructor(
        minLon: number,
        minLat: number,
        minHeight: Length,
        public minTimestamp: Timestamp,
        maxLon: number,
        maxLat: number,
        maxHeight: Length,
        public maxTimestamp: Timestamp,
    ) {
        super(minLon, minLat, minHeight, maxLon, maxLat, maxHeight);
    }


    public clone(): Extent4d {
        return new Extent4d(
            this.minLon,
            this.minLat,
            this.minHeight,
            this.minTimestamp,
            this.maxLon,
            this.maxLat,
            this.maxHeight,
            this.maxTimestamp
        );
    }
}
