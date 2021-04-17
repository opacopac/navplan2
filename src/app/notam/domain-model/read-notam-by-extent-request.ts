import {Extent2d} from '../../geo-math/domain-model/geometry/extent2d';


export class ReadNotamByExtentRequest {
    constructor(
        public extent: Extent2d,
        public zoom: number,
        public starttimestamp: number,
        public endtimestamp: number
    ) {
    }
}
