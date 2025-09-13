import {IRestAltitude} from '../../../geo-physics/rest/model/i-rest-altitude';
import {IRestPosition2d} from '../../../geo-physics/rest/model/i-rest-position2d';


export interface IRestWeatherInfo {
    0: number;
    1: IRestAltitude;
    2: IRestPosition2d;
}
