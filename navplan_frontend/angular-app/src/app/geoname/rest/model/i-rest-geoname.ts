import {IRestPosition2d} from '../../../geo-physics/rest/model/i-rest-position2d';
import {IRestAltitude} from '../../../geo-physics/rest/model/i-rest-altitude';


export interface IRestGeoname {
    id: number;
    name: string;
    searchresultname: string;
    feature_class: string;
    feature_code: string;
    country: string;
    admin1: string;
    admin2: string;
    population: number;
    position: IRestPosition2d;
    elevation: IRestAltitude;
}
