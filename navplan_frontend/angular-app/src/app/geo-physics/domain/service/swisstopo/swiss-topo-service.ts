import {Position2d} from '../../model/geometry/position2d';
import {GeoCoordinate} from '../../model/geometry/geo-coordinate';
import {GenericGeoCoordinate} from '../../model/geometry/generic-geo-coordinate';
import {GeoCoordinateType} from '../../../../aerodrome-charts/domain/model/geo-coordinate-type';
import {Swisstopo} from './wgs84_ch1903';

export class SwissTopoService {
    private static LV95_OFFSET_E = 2000000;
    private static LV95_OFFSET_N = 1000000;


    public static wsg84ToLv03(pos: Position2d): GeoCoordinate {
        if (!pos) {
            return null;
        }

        const [chX, chY] = Swisstopo.WGStoCH(pos.latitude, pos.longitude);

        return new GenericGeoCoordinate(GeoCoordinateType.LV03, chX, chY);
    }


    public static lv03ToWgs84(pos: GeoCoordinate): Position2d {
        if (!pos) {
            return null;
        }

        const [lon, lat] = Swisstopo.CHtoWGS(pos.getE(), pos.getN());

        return new Position2d(lon, lat);
    }


    public static lv95ToWgs84(pos: GeoCoordinate): Position2d {
        if (!pos) {
            return null;
        }

        const lv03Pos = SwissTopoService.lv95ToLv03(pos);

        return SwissTopoService.lv03ToWgs84(lv03Pos);
    }


    public static Wgs84ToLv95(pos: Position2d): GeoCoordinate {
        if (!pos) {
            return null;
        }

        const lv03Pos = SwissTopoService.wsg84ToLv03(pos);

        return SwissTopoService.lv03ToLv95(lv03Pos);
    }


    public static lv03ToLv95(pos: GeoCoordinate): GeoCoordinate {
        if (!pos) {
            return null;
        }

        return new GenericGeoCoordinate(
            GeoCoordinateType.LV95,
            pos.getE() + SwissTopoService.LV95_OFFSET_E,
            pos.getN() + SwissTopoService.LV95_OFFSET_N
        );
    }


    public static lv95ToLv03(pos: GeoCoordinate): GeoCoordinate {
        if (!pos) {
            return null;
        }

        return new GenericGeoCoordinate(
            GeoCoordinateType.LV03,
            pos.getE() - SwissTopoService.LV95_OFFSET_E,
            pos.getN() - SwissTopoService.LV95_OFFSET_N
        );
    }
}
