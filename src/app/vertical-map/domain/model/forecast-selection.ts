import {MeteoDwdLayer} from '../../../meteo-dwd/domain/model/meteo-dwd-layer';
import {ForecastRun} from '../../../meteo-dwd/domain/model/forecast-run';


export class ForecastSelection {
    constructor(
        public layer: MeteoDwdLayer,
        public forecastRun: ForecastRun,
        public forecastStep: number
    ) {
    }
}
