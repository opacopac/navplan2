import {MeteoDwdButtonStatus} from '../../domain/model/meteo-dwd-button-status';
import {ValueGrid} from '../../domain/model/value-grid';
import {WindInfo} from '../../domain/model/wind-info';
import {WeatherInfo} from '../../domain/model/weather-info';
import {MeteoDwdLayer} from '../../domain/model/meteo-dwd-layer';
import {ForecastRun} from '../../domain/model/forecast-run';


export interface MeteoDwdState {
    buttonStatus: MeteoDwdButtonStatus;
    showLayer: MeteoDwdLayer;
    forecastRun: ForecastRun;
    selectedInterval: number;
    mapTilesUrl: string;
    weatherGrid: ValueGrid<WeatherInfo>;
    windGrid: ValueGrid<WindInfo>;
}
