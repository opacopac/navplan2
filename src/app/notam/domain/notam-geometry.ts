import {Geometry2d} from '../../shared/model/geometry/geometry2d';
import {Altitude} from '../../shared/model/geometry/altitude';


export class NotamGeometry {
    constructor(
        public geometry2d: Geometry2d,
        public altBottom: Altitude,
        public altTop: Altitude) {
    }
}
