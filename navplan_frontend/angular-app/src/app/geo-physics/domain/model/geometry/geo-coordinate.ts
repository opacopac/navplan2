import {GeoCoordinateType} from '../../../../aerodrome-charts/domain/model/geo-coordinate-type';

export interface GeoCoordinate {
    getType(): GeoCoordinateType;

    getE(): number;

    getN(): number;
}
