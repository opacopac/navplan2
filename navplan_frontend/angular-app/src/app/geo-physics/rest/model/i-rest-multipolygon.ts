import {IRestPolygon} from './i-rest-polygon';


export interface IRestMultipolygon extends Array<IRestPolygon> {
    [n: number]: IRestPolygon;
}
