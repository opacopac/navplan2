import {IRestWeatherModelConfig} from './i-rest-weather-model-config';


export interface IRestForecastRun {
    starttime: string;
    model: IRestWeatherModelConfig;
}
