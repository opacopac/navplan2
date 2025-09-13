import {MeteoForecastLayer} from './meteo-forecast-layer';
import {ForecastRun} from './forecast-run';


export class ForecastSelection {
    constructor(
        public layer: MeteoForecastLayer,
        public forecastRun: ForecastRun,
        public forecastStep: number
    ) {
    }
}
