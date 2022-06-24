import {MeteoDwdButtonStatus} from './meteo-dwd-button-status';
import {ValueGrid} from './value-grid';
import {WindInfo} from './wind-info';
import {WeatherInfo} from './weather-info';
import {MeteoDwdLayer} from './meteo-dwd-layer';


export interface MeteoDwdState {
    buttonStatus: MeteoDwdButtonStatus;
    showLayer: MeteoDwdLayer;
    selectedInterval: number;
    mapTilesUrl: string;
    weatherGrid: ValueGrid<WeatherInfo>;
    windGrid: ValueGrid<WindInfo>;
}
