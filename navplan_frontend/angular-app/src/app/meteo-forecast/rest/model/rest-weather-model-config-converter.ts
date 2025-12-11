import {IRestWeatherModelConfig} from './i-rest-weather-model-config';
import {WeatherModelConfig} from '../../domain/model/weather-model-config';
import {RestTimeConverter} from '../../../geo-physics/rest/model/rest-time-converter';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import {WeatherModelType} from '../../domain/model/weather-model-type';
import {Polygon} from '../../../geo-physics/domain/model/geometry/polygon';


export class RestWeatherModelConfigConverter {
    public static fromRest(restConfig: IRestWeatherModelConfig): WeatherModelConfig {
        return new WeatherModelConfig(
            WeatherModelType[restConfig.model],
            restConfig.minstep,
            restConfig.maxstep,
            RestTimeConverter.fromRest(restConfig.steplen),
            RestLengthConverter.fromRest(restConfig.gridresolution),
            restConfig.maxzoom,
            Polygon.createFromArray(restConfig.spatialcoverage as [number, number][])
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
            gridresolution: RestLengthConverter.toRest(config.gridResolution),
            maxzoom: config.maxZoomLevel,
            spatialcoverage: config.spatialCoverage?.toArray()
        };
    }
}
