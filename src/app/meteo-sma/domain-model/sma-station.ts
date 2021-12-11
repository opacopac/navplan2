import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import {Altitude} from '../../geo-physics/domain-model/geometry/altitude';


export class SmaStation {
    constructor(
        public id: string,
        public name: string,
        public position: Position2d,
        public altitude: Altitude
    ) {
    }
}
