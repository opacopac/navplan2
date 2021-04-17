import {IRestNotam} from './i-rest-notam';
import {NotamGeometry} from '../domain-model/notam-geometry';
import {AltitudeConverter} from '../../geo-math/rest-model/altitude-converter';
import {CircleConverter} from '../../geo-math/rest-model/circle-converter';
import {PolygonConverter} from '../../geo-math/rest-model/polygon-converter';
import {MultipolygonConverter} from '../../geo-math/rest-model/multipolygon-converter';
import {Geometry2d} from '../../geo-math/domain-model/geometry/geometry2d';


export class NotamGeometryConverter {
    public static fromRest(restNotam: IRestNotam): NotamGeometry {
        if (!restNotam.geometry) {
            return undefined;
        }

        let geometry: Geometry2d;
        if (restNotam.geometry.circle) {
            geometry = CircleConverter.fromRest(restNotam.geometry.circle);
        } else if (restNotam.geometry.polygon) {
            geometry = PolygonConverter.fromRest(restNotam.geometry.polygon);
        } else if (restNotam.geometry.multipolygon) {
            geometry = MultipolygonConverter.fromRest(restNotam.geometry.multipolygon);
        }

        return new NotamGeometry(
            geometry,
            restNotam.geometry.alt_bottom ? AltitudeConverter.fromRest(restNotam.geometry.alt_bottom) : undefined,
            restNotam.geometry.alt_top ? AltitudeConverter.fromRest(restNotam.geometry.alt_top) : undefined
        );
    }
}
