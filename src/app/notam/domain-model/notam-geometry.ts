import {Geometry2d} from '../../common/geo-math/domain-model/geometry/geometry2d';
import {Altitude} from '../../common/geo-math/domain-model/geometry/altitude';


export class NotamGeometry {
    constructor(
        public geometry2d: Geometry2d,
        public altBottom: Altitude,
        public altTop: Altitude) {
    }
}
