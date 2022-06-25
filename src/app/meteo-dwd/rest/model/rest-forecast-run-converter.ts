import {IRestForecastRun} from './i-rest-forecast-run';
import {ForecastRun} from '../../domain/model/forecast-run';
import {RestDatetimeConverter} from '../../../geo-physics/rest/model/rest-datetime-converter';


export class RestForecastRunConverter {
    public static fromRestList(restForecastRuns: IRestForecastRun[]): ForecastRun[] {
        return restForecastRuns
            .map(restForecastRun => this.fromRest(restForecastRun));
    }


    public static fromRest(restForecastRun: IRestForecastRun): ForecastRun {
        return new ForecastRun(
            RestDatetimeConverter.fromRest(restForecastRun.starttime)
        );
    }
}
