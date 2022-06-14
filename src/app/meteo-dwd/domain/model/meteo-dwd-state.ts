import {MeteoDwdButtonStatus} from './meteo-dwd-button-status';
import {ValueGrid} from './value-grid';
import {WindSpeedDir} from './wind-speed-dir';
import {WwValue} from './ww-value';


export interface MeteoDwdState {
    buttonStatus: MeteoDwdButtonStatus;
    showWeatherForecast: boolean;
    showWindForecast: boolean;
    selectedInterval: number;
    weatherGrid: ValueGrid<WwValue>;
    windGrid: ValueGrid<WindSpeedDir>;
}
