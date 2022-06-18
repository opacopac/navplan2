import {MeteoDwdButtonStatus} from './meteo-dwd-button-status';
import {ValueGrid} from './value-grid';
import {WindInfo} from './wind-info';
import {WeatherInfo} from './weather-info';


export interface MeteoDwdState {
    buttonStatus: MeteoDwdButtonStatus;
    showWeatherForecast: boolean;
    showWindForecast: boolean;
    selectedInterval: number;
    weatherGrid: ValueGrid<WeatherInfo>;
    windGrid: ValueGrid<WindInfo>;
}
