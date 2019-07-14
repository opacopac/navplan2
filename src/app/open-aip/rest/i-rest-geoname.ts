import {IRestPosition2d} from '../../geo-math/rest/i-rest-position2d';
import {IRestLength} from '../../geo-math/rest/i-rest-length';

export interface IRestGeoname {
    id: string;
    name: string;
    searchresultname: string;
    feature_class: string;
    feature_code: string;
    country: string;
    admin1: string;
    admin2: string;
    population: number;
    pos: IRestPosition2d;
    elevation: IRestLength;
}
