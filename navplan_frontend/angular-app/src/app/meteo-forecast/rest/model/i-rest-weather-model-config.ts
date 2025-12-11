import {IRestTime} from '../../../geo-physics/rest/model/i-rest-time';
import {IRestPosition2d} from '../../../geo-physics/rest/model/i-rest-position2d';


export interface IRestWeatherModelConfig {
    model: string;
    minstep: number;
    maxstep: number;
    steplen: IRestTime;
    maxzoom: number;
    spatialcoverage: IRestPosition2d[];
}
