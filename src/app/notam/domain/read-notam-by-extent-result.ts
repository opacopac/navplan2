import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {NotamList} from './notam-list';


export class ReadNotamByExtentResult {
    constructor(
        public extent: Extent2d,
        public zoom: number,
        public notamList: NotamList,
        public timestampMs: number
    ) {}
}
