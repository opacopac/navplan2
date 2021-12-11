import {IRestPosition2d} from '../../geo-physics-rest/rest-model/i-rest-position2d';
import {IRestLength} from '../../geo-physics-rest/rest-model/i-rest-length';


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
    elevation: IRestLength;
}
