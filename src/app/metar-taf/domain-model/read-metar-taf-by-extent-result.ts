import {Extent2d} from '../../geo-math/domain-model/geometry/extent2d';
import {MetarTafList} from './metar-taf';


export class ReadMetarTafByExtentResult {
    constructor(
        public extent: Extent2d,
        public zoom: number,
        public metarTafList: MetarTafList,
        public timestampMs: number
    ) {
    }
}
