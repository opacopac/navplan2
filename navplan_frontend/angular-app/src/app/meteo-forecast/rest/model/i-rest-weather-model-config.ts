import {IRestTime} from '../../../geo-physics/rest/model/i-rest-time';
import {IRestPosition2d} from '../../../geo-physics/rest/model/i-rest-position2d';
import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';


export interface IRestWeatherModelConfig {
    model: string;
    minstep: number;
    maxstep: number;
    steplen: IRestTime;
    gridresolution: IRestLength;
    maxzoom: number;
    spatialcoverage: IRestPosition2d[];
}
