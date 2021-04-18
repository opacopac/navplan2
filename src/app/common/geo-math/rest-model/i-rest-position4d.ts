import {IRestPosition2d} from './i-rest-position2d';
import {IRestAltitude} from './i-rest-altitude';


export interface IRestPosition4d {
    pos: IRestPosition2d;
    alt: IRestAltitude;
    time: number;
}
