import {GeoCoordinateType} from '../../../../aerodrome-charts/domain/model/geo-coordinate-type';
import {Swisstopo} from './wgs84_ch1903';
import {GeoCoordinate} from '../../model/geometry/geo-coordinate';

export class SwissTopoService {
    public static readonly LV95_OFFSET_E = 2000000;
    public static readonly LV95_OFFSET_N = 1000000;
    public static readonly LV03_MIN_E = 460000;
    public static readonly LV03_MAX_E = 868000;
    public static readonly LV03_MIN_N = 42000;
    public static readonly LV03_MAX_N = 322000;
    public static readonly LV95_MIN_E = SwissTopoService.LV03_MIN_E + SwissTopoService.LV95_OFFSET_E;
    public static readonly LV95_MAX_E = SwissTopoService.LV03_MAX_E + SwissTopoService.LV95_OFFSET_E;
    public static readonly LV95_MIN_N = SwissTopoService.LV03_MIN_N + SwissTopoService.LV95_OFFSET_N;
    public static readonly LV95_MAX_N = SwissTopoService.LV03_MAX_N + SwissTopoService.LV95_OFFSET_N;


    public static wgs84ToLv03(pos: GeoCoordinate): GeoCoordinate {
        if (!pos) {
            return null;
        }

        const [chX, chY] = Swisstopo.WGStoCH(pos.getN(), pos.getE());

        return GeoCoordinate.ofLv03(chX, chY);
    }


    public static lv03ToWgs84(pos: GeoCoordinate): GeoCoordinate {
        if (!pos) {
            return null;
        }

        const [lon, lat] = Swisstopo.CHtoWGS(pos.getE(), pos.getN());

        return GeoCoordinate.ofWgs84(lon, lat);
    }


    public static lv95ToWgs84(pos: GeoCoordinate): GeoCoordinate {
        if (!pos) {
            return null;
        }

        const lv03Pos = SwissTopoService.lv95ToLv03(pos);

        return SwissTopoService.lv03ToWgs84(lv03Pos);
    }


    public static Wgs84ToLv95(pos: GeoCoordinate): GeoCoordinate {
        if (!pos) {
            return null;
        }

        const lv03Pos = SwissTopoService.wgs84ToLv03(pos);

        return SwissTopoService.lv03ToLv95(lv03Pos);
    }


    public static lv03ToLv95(pos: GeoCoordinate): GeoCoordinate {
        if (!pos) {
            return null;
        }

        return new GeoCoordinate(
            GeoCoordinateType.LV95,
            pos.getE() + SwissTopoService.LV95_OFFSET_E,
            pos.getN() + SwissTopoService.LV95_OFFSET_N
        );
    }


    public static lv95ToLv03(pos: GeoCoordinate): GeoCoordinate {
        if (!pos) {
            return null;
        }

        return new GeoCoordinate(
            GeoCoordinateType.LV03,
            pos.getE() - SwissTopoService.LV95_OFFSET_E,
            pos.getN() - SwissTopoService.LV95_OFFSET_N
        );
    }
}
