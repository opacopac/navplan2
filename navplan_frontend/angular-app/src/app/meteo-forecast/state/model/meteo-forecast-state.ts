import {MeteoForecastStatus} from '../../domain/model/meteo-forecast-status';
import {WindInfo} from '../../domain/model/wind-info';
import {WeatherInfo} from '../../domain/model/weather-info';
import {MeteoForecastLayer} from '../../domain/model/meteo-forecast-layer';
import {ForecastRun} from '../../domain/model/forecast-run';


export interface MeteoForecastState {
    status: MeteoForecastStatus;
    showLayer: MeteoForecastLayer;
    availableFcRuns: ForecastRun[];
    selectedFcRun: ForecastRun;
    selectedStep: number;
    mapTilesUrl: string;
    weatherValues: WeatherInfo[];
    windValues: WindInfo[];
}
