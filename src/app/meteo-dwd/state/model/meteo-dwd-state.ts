import {MeteoDwdStatus} from '../../domain/model/meteo-dwd-status';
import {WindInfo} from '../../domain/model/wind-info';
import {WeatherInfo} from '../../domain/model/weather-info';
import {MeteoDwdLayer} from '../../domain/model/meteo-dwd-layer';
import {ForecastRun} from '../../domain/model/forecast-run';


export interface MeteoDwdState {
    status: MeteoDwdStatus;
    showLayer: MeteoDwdLayer;
    forecastRun: ForecastRun;
    selectedStep: number;
    mapTilesUrl: string;
    weatherValues: WeatherInfo[];
    windValues: WindInfo[];
}
