import {IRestPosition2d} from './i-rest-position2d';
import {IRestAltitude} from './i-rest-altitude';


export interface IRestPosition4d {
    0: IRestPosition2d;
    1: IRestAltitude;
    2: number;
}
