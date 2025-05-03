import {GeoCoordinateType} from '../../../../aerodrome-charts/domain/model/geo-coordinate-type';
import {GeoCoordinate} from './geo-coordinate';


export class GenericGeoCoordinate implements GeoCoordinate {
    private readonly type: GeoCoordinateType;
    private readonly e: number;
    private readonly n: number;

    constructor(type: GeoCoordinateType, e: number, n: number) {
        this.type = type;
        this.e = e;
        this.n = n;
    }

    public getType(): GeoCoordinateType {
        return this.type;
    }

    public getE(): number {
        return this.e;
    }

    public getN(): number {
        return this.n;
    }
}
