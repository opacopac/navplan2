import {IRestNotam} from './i-rest-notam';
import {NotamGeometry} from '../domain/notam-geometry';
import {RestAltitude} from '../../geo-math/rest/rest-altitude';
import {RestCircle} from '../../geo-math/rest/rest-circle';
import {RestPolygon} from '../../geo-math/rest/rest-polygon';
import {RestMultipolygon} from '../../geo-math/rest/rest-multipolygon';
import {Geometry2d} from '../../geo-math/domain/geometry/geometry2d';


export class RestNotamGeometry {
    public static fromRest(restNotam: IRestNotam): NotamGeometry {
        if (!restNotam.geometry) {
            return undefined;
        }

        let geometry: Geometry2d;
        if (restNotam.geometry.circle) {
            geometry = RestCircle.fromRest(restNotam.geometry.circle);
        } else if (restNotam.geometry.polygon) {
            geometry = RestPolygon.fromRest(restNotam.geometry.polygon);
        } else if (restNotam.geometry.multipolygon) {
            geometry = RestMultipolygon.fromRest(restNotam.geometry.multipolygon);
        }

        return new NotamGeometry(
            geometry,
            restNotam.geometry.alt_bottom ? RestAltitude.fromRest(restNotam.geometry.alt_bottom) : undefined,
            restNotam.geometry.alt_top ? RestAltitude.fromRest(restNotam.geometry.alt_top) : undefined
        );
    }
}
