import {IRestPosition2d} from './i-rest-position2d';


export interface IRestPolygon extends Array<IRestPosition2d> {
    [n: number]: IRestPosition2d;
}
