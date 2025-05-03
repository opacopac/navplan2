import {XyCoord} from '../../../geo-physics/domain/model/geometry/xyCoord';
import {GeoCoordinate} from '../../../geo-physics/domain/model/geometry/geo-coordinate';
import {ChartRegistrationType} from './chart-registration-type';
import {GeoCoordinateType} from './geo-coordinate-type';


export class ChartRegistration {
    constructor(
        public chartRegistrationType: ChartRegistrationType,
        public coordinateType: GeoCoordinateType,
        public pixelXy1: XyCoord,
        public geoCoord1: GeoCoordinate,
        public pixelXy2: XyCoord | null,
        public geoCoord2: GeoCoordinate | null,
        public scale: number
    ) {
    }
}
