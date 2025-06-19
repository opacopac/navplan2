import {IRestGeocoordinate} from './i-rest-geocoordinate';
import {GeoCoordinate} from '../../domain/model/geometry/geo-coordinate';
import {GeoCoordinateType} from '../../../aerodrome-charts/domain/model/geo-coordinate-type';


export class RestGeocoordinateConverter {
    public static fromRest(restCoord: IRestGeocoordinate): GeoCoordinate | null {
        if (!restCoord) {
            return null;
        }

        return new GeoCoordinate(
            GeoCoordinateType[restCoord[0]],
            restCoord[1],
            restCoord[2]
        );
    }


    public static toRest(coord: GeoCoordinate): IRestGeocoordinate | null {
        if (!coord) {
            return null;
        }

        return [
            GeoCoordinateType[coord.getType()],
            coord.getE(),
            coord.getN()
        ];
    }
}
