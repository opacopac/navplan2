import {IRestGeocoordinate} from './i-rest-geocoordinate';
import {GeoCoordinate} from '../../domain/model/geometry/geo-coordinate';
import {GenericGeoCoordinate} from '../../domain/model/geometry/generic-geo-coordinate';
import {GeoCoordinateType} from '../../../aerodrome-charts/domain/model/geo-coordinate-type';


export class RestGeocoordinateConverter {
    public static fromRest(restCoord: IRestGeocoordinate): GeoCoordinate {
        return new GenericGeoCoordinate(
            GeoCoordinateType[restCoord[0]],
            restCoord[1],
            restCoord[2]
        );
    }


    public static toRest(coord: GeoCoordinate): IRestGeocoordinate {
        return [
            GeoCoordinateType[coord.getType()],
            coord.getE(),
            coord.getN()
        ];
    }
}
