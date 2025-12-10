import {WeatherModelType} from './weather-model-type';
import {Time} from '../../../geo-physics/domain/model/quantities/time';


export class WeatherModelConfig {
    public constructor(
        public modelType: WeatherModelType,
        public minStep: number,
        public maxStep: number,
        public stepLength: Time,
        public maxZoomLevel: number
    ) {
    }
}
