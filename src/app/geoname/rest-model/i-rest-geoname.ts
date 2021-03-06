import {IRestPosition2d} from '../../common/geo-math/rest-model/i-rest-position2d';
import {IRestLength} from '../../common/geo-math/rest-model/i-rest-length';


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
