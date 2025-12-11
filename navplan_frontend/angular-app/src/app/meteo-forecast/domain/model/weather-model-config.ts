import {WeatherModelType} from './weather-model-type';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {Polygon} from '../../../geo-physics/domain/model/geometry/polygon';


export class WeatherModelConfig {
    public constructor(
        public modelType: WeatherModelType,
        public minStep: number,
        public maxStep: number,
        public stepLength: Time,
        public maxZoomLevel: number,
        public spatialCoverage: Polygon
    ) {
    }
}
