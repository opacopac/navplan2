import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


export class AdChart {
    constructor(
        public id: number,
        public airportIcao: string,
        public source: string,
        public type: string,
        public fileName: string,
        public extent: Extent2d
    ) {
    }
}
