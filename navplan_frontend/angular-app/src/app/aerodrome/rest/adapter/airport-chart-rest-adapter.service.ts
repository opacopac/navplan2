import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {AirportChart} from '../../domain/model/airport-chart';
import {IRestAirportChart} from '../model/i-rest-airport-chart';
import {RestAirportChartConverter} from '../converter/rest-airport-chart-converter';
import {IAirportChartRepoService} from '../../domain/service/i-airport-chart-repo.service';
import {RestAirportChart2Converter} from '../converter/rest-airport-chart2-converter';
import {IRestAirportChart2} from '../model/i-rest-airport-chart2';


@Injectable()
export class AirportChartRestAdapter implements IAirportChartRepoService {
    constructor(private http: HttpClient) {
    }


    public readAdChartById(chartId: number): Observable<AirportChart> {
        const url: string = environment.airportServiceUrl + '?action=getChartById&id=' + chartId;

        return this.http
            .get<IRestAirportChart>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAirportChartConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport chart by id', err);
                    return throwError(err);
                })
            );
    }


    public readAdChart2ById(chartId: number): Observable<AirportChart> {
        const url: string = environment.airportServiceUrl + '?action=getChart2ById&id=' + chartId;

        return this.http
            .get<IRestAirportChart2>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAirportChart2Converter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport chart by id', err);
                    return throwError(err);
                })
            );
    }
}
