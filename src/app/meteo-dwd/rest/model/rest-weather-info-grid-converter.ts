import {ValueGrid} from '../../domain/model/value-grid';
import {RestGridDefinitionConverter} from './rest-grid-definition-converter';
import {IRestWeatherInfoGrid} from './i-rest-weather-info-grid';
import {RestWeatherInfoConverter} from './rest-weather-info-converter';
import {WeatherInfo} from '../../domain/model/weather-info';


export class RestWeatherInfoGridConverter {
    public static fromRest(restWwGrid: IRestWeatherInfoGrid): ValueGrid<WeatherInfo> {
        return new ValueGrid<WeatherInfo>(
            RestGridDefinitionConverter.fromRest(restWwGrid.grid),
            RestWeatherInfoConverter.fromRestList(restWwGrid.values)
        );
    }
}
