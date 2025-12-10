import {IRestWeatherModelConfig} from './i-rest-weather-model-config';
import {WeatherModelConfig} from '../../domain/model/weather-model-config';
import {RestTimeConverter} from '../../../geo-physics/rest/model/rest-time-converter';
import {WeatherModelType} from '../../domain/model/weather-model-type';


export class RestWeatherModelConfigConverter {
    public static fromRest(restConfig: IRestWeatherModelConfig): WeatherModelConfig {
        return new WeatherModelConfig(
            WeatherModelType[restConfig.model],
            restConfig.minstep,
            restConfig.maxstep,
            RestTimeConverter.fromRest(restConfig.steplen),
            restConfig.maxzoom
        );
    }


    public static toRest(config: WeatherModelConfig): IRestWeatherModelConfig {
        if (!config) {
            return null;
        }

        return {
            model: WeatherModelType[config.modelType],
            minstep: config.minStep,
            maxstep: config.maxStep,
            steplen: RestTimeConverter.toRest(config.stepLength),
            maxzoom: config.maxZoomLevel
        };
    }
}
