import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {AirportChart} from '../domain-model/airport-chart';
import {IRestAirportChart} from '../rest-model/i-rest-airport-chart';
import {RestAirportChartConverter} from '../rest-model/rest-airport-chart-converter';
import {IAirportChartRepo} from '../domain-service/i-airport-chart-repo';


@Injectable()
export class AirportChartRestService implements IAirportChartRepo {
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
}
