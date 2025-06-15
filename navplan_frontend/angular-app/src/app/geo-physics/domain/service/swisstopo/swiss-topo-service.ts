import {Position2d} from '../../model/geometry/position2d';
import {GeoCoordinate} from '../../model/geometry/geo-coordinate';
import {GenericGeoCoordinate} from '../../model/geometry/generic-geo-coordinate';
import {GeoCoordinateType} from '../../../../aerodrome-charts/domain/model/geo-coordinate-type';
import {Swisstopo} from './wgs84_ch1903';

export class SwissTopoService {
    public static toCh03(pos: Position2d): GeoCoordinate {
        if (!pos) {
            return null;
        }

        const [chX, chY] = Swisstopo.WGStoCH(pos.latitude, pos.longitude);

        return new GenericGeoCoordinate(GeoCoordinateType.LV03, chX, chY);
    }


    public static toWgs84(pos: GeoCoordinate): Position2d {
        if (!pos) {
            return null;
        }

        const [lon, lat] = Swisstopo.CHtoWGS(pos.getE(), pos.getN());

        return new Position2d(lon, lat);
    }
}
