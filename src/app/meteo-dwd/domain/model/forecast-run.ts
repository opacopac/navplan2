import {WeatherModelConfig} from './weather-model-config';


export class ForecastRun {
    public constructor(
        public startTime: Date,
        public model: WeatherModelConfig
    ) {
    }
}
