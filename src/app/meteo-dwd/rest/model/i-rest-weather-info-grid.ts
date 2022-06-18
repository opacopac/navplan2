import {IRestGridDefinition} from './i-rest-grid-definition';
import {IRestWeatherInfo} from './i-rest-weather-info';


export interface IRestWeatherInfoGrid {
    grid: IRestGridDefinition;
    values: IRestWeatherInfo[];
}
