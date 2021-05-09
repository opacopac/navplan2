import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {AdChart} from '../domain-model/ad-chart';
import {IRestAdChart} from '../rest-model/i-rest-ad-chart';
import {AdChartConverter} from '../rest-model/ad-chart-converter';


@Injectable()
export class ChartService {
    constructor(private http: HttpClient) {
    }


    public readAdChartList(airportIcao: string): Observable<AdChart[]> {
        const url: string = environment.airportServiceUrl + '?action=getChartsByIcao&icao=' + airportIcao;

        return this.http
            .get<IRestAdChart[]>(url, {observe: 'response'})
            .pipe(
                map((response) => AdChartConverter.fromRestList(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ad charts by icao', err);
                    return throwError(err);
                })
            );
    }


    public readAdChart(chartId: number): Observable<AdChart> {
        const url: string = environment.airportServiceUrl + '?action=getChartById&id=' + chartId;

        return this.http
            .get<IRestAdChart>(url, {observe: 'response'})
            .pipe(
                map((response) => AdChartConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ad chart by id', err);
                    return throwError(err);
                })
            );
    }
}
