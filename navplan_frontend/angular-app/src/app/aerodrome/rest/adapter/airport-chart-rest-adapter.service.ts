import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {AirportChart} from '../../domain/model/airport-chart';
import {IAirportChartRepoService} from '../../domain/service/i-airport-chart-repo.service';
import {RestAirportChart2Converter} from '../converter/rest-airport-chart2-converter';
import {IRestAirportChart2} from '../model/i-rest-airport-chart2';


@Injectable()
export class AirportChartRestAdapter implements IAirportChartRepoService {
    constructor(private http: HttpClient) {
    }


    public readAdChartById(chartId: number): Observable<AirportChart> {
        const url: string = environment.airportChartApiBaseUrl + '/' + chartId;

        return this.http
            .get<IRestAirportChart2>(url)
            .pipe(
                map((response) => RestAirportChart2Converter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport chart by id', err);
                    return throwError(err);
                })
            );
    }
}
