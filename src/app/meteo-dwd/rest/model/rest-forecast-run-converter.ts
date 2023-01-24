import {IRestForecastRun} from './i-rest-forecast-run';
import {ForecastRun} from '../../domain/model/forecast-run';
import {RestDatetimeConverter} from '../../../geo-physics/rest/model/rest-datetime-converter';
import {RestWeatherModelConfigConverter} from './rest-weather-model-config-converter';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';


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


    public static toRest(forecast: ForecastRun): string {
        if (!forecast) {
            return null;
        }

        return forecast.startTime.getUTCFullYear()
            + StringnumberHelper.zeroPad(forecast.startTime.getUTCMonth() + 1, 2)
            + StringnumberHelper.zeroPad(forecast.startTime.getUTCDate(), 2)
            + StringnumberHelper.zeroPad(forecast.startTime.getUTCHours(), 2);
    }
}
