import {IRestXycoord} from '../../../geo-physics/rest/model/i-rest-xycoord';
import {IRestGeocoordinate} from '../../../geo-physics/rest/model/i-rest-geocoordinate';


export interface IRestChartRegistration {
    registrationType: string;
    coordinateType: string;
    pixelXy1: IRestXycoord;
    geoCoord1: IRestGeocoordinate;
    pixelXy2: IRestXycoord | null;
    geoCoord2: IRestGeocoordinate | null;
    scale: number;
}
