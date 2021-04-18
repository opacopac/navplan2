import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {OpenAipItems} from './open-aip-items';


export class ReadOpenAipItemsByExtentResult {
    constructor(
        public extent: Extent2d,
        public zoom: number,
        public openAipItems: OpenAipItems,
        public timestampMs: number
    ) {
    }
}
