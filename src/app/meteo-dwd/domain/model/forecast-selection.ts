import {MeteoDwdLayer} from './meteo-dwd-layer';
import {ForecastRun} from './forecast-run';


export class ForecastSelection {
    constructor(
        public layer: MeteoDwdLayer,
        public forecastRun: ForecastRun,
        public forecastStep: number
    ) {
    }
}
