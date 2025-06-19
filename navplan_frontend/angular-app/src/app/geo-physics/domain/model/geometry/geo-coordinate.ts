import {GeoCoordinateType} from '../../../../aerodrome-charts/domain/model/geo-coordinate-type';
import {Position2d} from './position2d';
import {SwissTopoService} from '../../service/swisstopo/swiss-topo-service';


export class GeoCoordinate {
    private readonly type: GeoCoordinateType;
    private readonly _e: number;
    private readonly _n: number;


    public static ofPos2d(pos: Position2d): GeoCoordinate {
        return new GeoCoordinate(GeoCoordinateType.LON_LAT, pos.longitude, pos.latitude);
    }


    public static ofWgs84(lon: number, lat: number): GeoCoordinate {
        return new GeoCoordinate(GeoCoordinateType.LON_LAT, lon, lat);
    }


    public static ofLv03(e: number, n: number): GeoCoordinate {
        return new GeoCoordinate(GeoCoordinateType.LV03, e, n);
    }


    public static ofLv95(e: number, n: number): GeoCoordinate {
        return new GeoCoordinate(GeoCoordinateType.LV95, e, n);
    }


    public static ofType(
        type: GeoCoordinateType,
        e: number,
        n: number
    ): GeoCoordinate {
        switch (type) {
            case GeoCoordinateType.LV03:
                return GeoCoordinate.ofLv03(e, n);
            case GeoCoordinateType.LV95:
                return GeoCoordinate.ofLv95(e, n);
            case GeoCoordinateType.LON_LAT:
                return GeoCoordinate.ofWgs84(e, n);
            default:
                throw new Error('unsupported geo coordinate type');
        }
    }


    constructor(type: GeoCoordinateType, e: number, n: number) {
        this.type = type;
        this._e = e;
        this._n = n;
    }


    public getType(): GeoCoordinateType {
        return this.type;
    }


    public getE(roundToDigits: number = NaN): number {
        if (!isNaN(roundToDigits)) {
            return parseFloat(this._e.toFixed(roundToDigits));
        }

        return this._e;
    }


    public getN(rountToDigits: number = NaN): number {
        if (!isNaN(rountToDigits)) {
            return parseFloat(this._n.toFixed(rountToDigits));
        }

        return this._n;
    }


    public toPos2d(): Position2d {
        const latLon = this.toType(GeoCoordinateType.LON_LAT);
        return new Position2d(latLon.getE(), latLon.getN());
    }


    public toType(newType: GeoCoordinateType): GeoCoordinate {
        if (this.type === newType) {
            return this;
        }


        switch (this.type) {
            case GeoCoordinateType.LON_LAT:
                switch (newType) {
                    case GeoCoordinateType.LV03:
                        return SwissTopoService.wgs84ToLv03(this);
                    case GeoCoordinateType.LV95:
                        return SwissTopoService.Wgs84ToLv95(this);
                    default:
                        throw new Error(this.getConvErrorText(newType));
                }
            case GeoCoordinateType.LV03:
                switch (newType) {
                    case GeoCoordinateType.LV95:
                        return SwissTopoService.lv03ToLv95(this);
                    case GeoCoordinateType.LON_LAT:
                        return SwissTopoService.lv03ToWgs84(this);
                    default:
                        throw new Error(this.getConvErrorText(newType));
                }
            case GeoCoordinateType.LV95:
                switch (newType) {
                    case GeoCoordinateType.LV03:
                        return SwissTopoService.lv95ToLv03(this);
                    case GeoCoordinateType.LON_LAT:
                        return SwissTopoService.lv95ToWgs84(this);
                    default:
                        throw new Error(this.getConvErrorText(newType));

                }
            default:
                throw new Error(this.getConvErrorText(newType));
        }
    }


    private getConvErrorText(newType: GeoCoordinateType): string {
        return 'unsupported conversion from ' + GeoCoordinateType[this.type]
            + ' to ' + GeoCoordinateType[newType];
    }
}
