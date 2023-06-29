import {IRestForecastRun} from './i-rest-forecast-run';
import {ForecastRun} from '../../domain/model/forecast-run';
import {RestDatetimeConverter} from '../../../geo-physics/rest/model/rest-datetime-converter';
import {RestWeatherModelConfigConverter} from './rest-weather-model-config-converter';


export class RestForecastRunConverter {
    public static fromRestList(restForecastRuns: IRestForecastRun[]): ForecastRun[] {
        return restForecastRuns
            .map(restForecastRun => this.fromRest(restForecastRun));
    }


    public static fromRest(restForecastRun: IRestForecastRun): ForecastRun {
        return new ForecastRun(
            RestDatetimeConverter.fromRest(restForecastRun.starttime),
            RestWeatherModelConfigConverter.fromRest(restForecastRun.model)
        );
    }


    public static toRest(forecastRun: ForecastRun): IRestForecastRun {
        if (!forecastRun) {
            return null;
        }

        return {
            starttime: RestDatetimeConverter.toRest(forecastRun.startTime),
            model: RestWeatherModelConfigConverter.toRest(forecastRun.model)
        };
    }
}
