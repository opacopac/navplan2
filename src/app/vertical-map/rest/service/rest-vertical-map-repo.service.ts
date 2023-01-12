import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {VerticalMap} from '../../domain/model/vertical-map';
import {RestVerticalMapConverter} from '../model/rest-vertical-map-converter';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IRestVerticalMapResponse} from '../model/i-rest-vertical-map-response';
import {IVerticalMapRepoService} from '../../domain/service/i-vertical-map-repo.service';
import {ForecastSelection} from '../../domain/model/forecast-selection';
import {RestForecastRunConverter} from '../../../meteo-dwd/rest/model/rest-forecast-run-converter';
import {RestForecastStepConverter} from '../../../meteo-dwd/rest/model/rest-forecast-step-converter';


@Injectable()
export class RestVerticalMapRepoService implements IVerticalMapRepoService {
    constructor(private http: HttpClient) {
    }


    readVerticalMap(wpPositions: [number, number][], fcSelection: ForecastSelection): Observable<VerticalMap> {
        const requestBody = {
            action: 'readvmap',
            positions: wpPositions,
            run: RestForecastRunConverter.toRest(fcSelection.forecastRun),
            step: RestForecastStepConverter.toRest(fcSelection.forecastStep)
        };
        return this.http
            .post<IRestVerticalMapResponse>(
                environment.verticalMapServiceUrl,
                JSON.stringify(requestBody),
                { observe: 'response' }
            )
            .pipe(
                map(response => RestVerticalMapConverter.fromRest(response.body.verticalMap)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading vertical map', err);
                    return throwError(err);
                })
            );
    }
}
