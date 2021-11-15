import {IRestNotam} from './i-rest-notam';
import {NotamGeometry} from '../domain-model/notam-geometry';
import {RestAltitudeConverter} from '../../common/geo-math/rest-model/rest-altitude-converter';
import {RestCircleConverter} from '../../common/geo-math/rest-model/rest-circle-converter';
import {PolygonConverter} from '../../common/geo-math/rest-model/polygon-converter';
import {MultipolygonConverter} from '../../common/geo-math/rest-model/multipolygon-converter';
import {Geometry2d} from '../../common/geo-math/domain-model/geometry/geometry2d';


export class RestNotamGeometryConverter {
    public static fromRest(restNotam: IRestNotam): NotamGeometry {
        if (!restNotam.geometry) {
            return undefined;
        }

        let geometry: Geometry2d;
        if (restNotam.geometry.circle) {
            geometry = RestCircleConverter.fromRest(restNotam.geometry.circle);
        } else if (restNotam.geometry.polygon) {
            geometry = PolygonConverter.fromRest(restNotam.geometry.polygon);
        } else if (restNotam.geometry.multipolygon) {
            geometry = MultipolygonConverter.fromRest(restNotam.geometry.multipolygon);
        }

        return new NotamGeometry(
            geometry,
            restNotam.geometry.alt_bottom ? RestAltitudeConverter.fromRest(restNotam.geometry.alt_bottom) : undefined,
            restNotam.geometry.alt_top ? RestAltitudeConverter.fromRest(restNotam.geometry.alt_top) : undefined
        );
    }
}
