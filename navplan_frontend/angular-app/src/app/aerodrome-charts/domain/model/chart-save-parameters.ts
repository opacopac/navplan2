import {XyCoord} from '../../../geo-physics/domain/model/geometry/xyCoord';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';

export class ChartSaveParameters {
    constructor(
        public url: string,
        public chartReference1: XyCoord,
        public chartReference2: XyCoord,
        public mapReference1: Position2d,
        public mapReference2: Position2d,
    ) {
    }
}
