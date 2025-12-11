import {WeatherModelType} from './weather-model-type';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {Polygon} from '../../../geo-physics/domain/model/geometry/polygon';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class WeatherModelConfig {
    public constructor(
        public modelType: WeatherModelType,
        public minStep: number,
        public maxStep: number,
        public stepLength: Time,
        public gridResolution: Length,
        public maxZoomLevel: number,
        public spatialCoverage: Polygon
    ) {
    }
}
