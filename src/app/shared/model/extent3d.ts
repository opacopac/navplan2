import {Extent} from './extent';
import {Length} from './quantities/length';


export class Extent3d extends Extent {
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
}
