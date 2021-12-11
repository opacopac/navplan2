import {Geometry2d} from '../../geo-physics/domain-model/geometry/geometry2d';
import {Altitude} from '../../geo-physics/domain-model/geometry/altitude';


export class NotamGeometry {
    constructor(
        public geometry2d: Geometry2d,
        public altBottom: Altitude,
        public altTop: Altitude) {
    }
}
