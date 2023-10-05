import {WeatherInfo} from '../../domain/model/weather-info';
import {IRestWeatherInfo} from './i-rest-weather-info';
import {RestAltitudeConverter} from '../../../geo-physics/rest/model/rest-altitude-converter';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';


export class RestWeatherInfoConverter {
    public static fromRestList(restWeatherInfos: IRestWeatherInfo[]): WeatherInfo[] {
        return restWeatherInfos.map(restWeatherInfo => RestWeatherInfoConverter.fromRest(restWeatherInfo));
    }


    public static fromRest(restWeatherInfo: IRestWeatherInfo): WeatherInfo {
        if (restWeatherInfo == null) {
            return undefined;
        }

        return new WeatherInfo(
            restWeatherInfo[0],
            RestAltitudeConverter.fromRest(restWeatherInfo[1]),
            Position2dConverter.fromRest(restWeatherInfo[2])
        );
    }
}
