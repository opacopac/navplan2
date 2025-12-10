import {IRestTime} from '../../../geo-physics/rest/model/i-rest-time';


export interface IRestWeatherModelConfig {
    model: string;
    minstep: number;
    maxstep: number;
    steplen: IRestTime;
    maxzoom: number;
}
