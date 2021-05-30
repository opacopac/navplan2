import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';


export class ReadNotamByPositionRequest {
    constructor(
        public position: Position2d,
        public starttimestamp: number,
        public endtimestamp: number
    ) {
    }
}
