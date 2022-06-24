import {IRestForecastRun} from './i-rest-forecast-run';
import {ForecastRun} from '../../domain/model/forecast-run';


export class RestForecastRunConverter {
    public static fromRestList(restForecastRuns: IRestForecastRun[]): ForecastRun[] {
        return restForecastRuns
            .map(restForecastRun => this.fromRest(restForecastRun));
    }


    public static fromRest(restForecastRun: IRestForecastRun): ForecastRun {
        return new ForecastRun(
            new Date(restForecastRun.date[0], restForecastRun.date[1] - 1, restForecastRun.date[2]),
            restForecastRun.run
        );
    }
}
