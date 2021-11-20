import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Altitude} from '../../common/geo-math/domain-model/geometry/altitude';


export class SmaStation {
    constructor(
        public id: string,
        public name: string,
        public position: Position2d,
        public altitude: Altitude
    ) {
    }
}
