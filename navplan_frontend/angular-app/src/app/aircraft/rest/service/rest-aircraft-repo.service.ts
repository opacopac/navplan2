import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../domain/model/aircraft';
import {IAircraftRepoService} from '../../domain/service/i-aircraft-repo.service';
import {environment} from '../../../../environments/environment';
import {IRestAircraftListResponse} from './i-rest-aircraft-list-response';
import {catchError, map} from 'rxjs/operators';
import {RestAircraftListConverter} from '../converter/rest-aircraft-list-converter';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IRestAircraftResponse} from './i-rest-aircraft-response';
import {RestAircraftResponseConverter} from '../converter/rest-aircraft-response-converter';
import {RestAircraftConverter} from '../converter/rest-aircraft-converter';
import {IRestSuccessResponse} from '../../../flightroute/rest/model/i-rest-success-response';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';


@Injectable()
export class RestAircraftRepoService implements IAircraftRepoService {
    constructor(private http: HttpClient) {
    }


    // region aircraft list

    public readAircraftList(): Observable<AircraftListEntry[]> {
        const url: string = environment.aircraftServiceUrl;

        return this.http
            .get<IRestAircraftListResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map((response) => RestAircraftListConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading aircraft list', err);
                    return throwError(err);
                })
            );
    }

    // endregion


    // region aircraft CRUD

    public readAircraft(aircraftId: number): Observable<Aircraft> {
        const url = environment.aircraftServiceUrl + '?id=' + aircraftId;

        return this.http
            .get<IRestAircraftResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map((response) => RestAircraftResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading aircraft', err);
                    return throwError(err);
                })
            );
    }


    public saveAircraft(aircraft: Aircraft): Observable<Aircraft> {
        const requestBody = {
            aircraft: RestAircraftConverter.toRest(aircraft)
        };
        if (aircraft.id > 0) {
            return this.http
                .put<IRestAircraftResponse>(
                    environment.aircraftServiceUrl,
                    JSON.stringify(requestBody),
                    HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
                ).pipe(
                    map(response => RestAircraftConverter.fromRest(response.aircraft)),
                    catchError(err => {
                        LoggingService.logResponseError('ERROR updating aircraft', err);
                        return throwError(err);
                    })
                );
        } else {
            return this.http
                .post<IRestAircraftResponse>(
                    environment.aircraftServiceUrl,
                    JSON.stringify(requestBody),
                    HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
                ).pipe(
                    map(response => RestAircraftConverter.fromRest(response.aircraft)),
                    catchError(err => {
                        LoggingService.logResponseError('ERROR creating aircraft', err);
                        return throwError(err);
                    })
                );
        }
    }


    public duplicateAircraft(aircraftId: number): Observable<Aircraft> {
        const requestBody = {
            id: aircraftId
        };
        return this.http
            .post<IRestAircraftResponse>(
                environment.aircraftServiceUrl,
                JSON.stringify(requestBody),
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            ).pipe(
                map(response => RestAircraftConverter.fromRest(response.aircraft)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR duplicating aircraft', err);
                    return throwError(err);
                })
            );
    }


    public deleteAircraft(aircraftId: number): Observable<boolean> {
        const url = environment.aircraftServiceUrl + '?id=' + aircraftId;

        return this.http
            .delete<IRestSuccessResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map(response => response.success),
                catchError(err => {
                    LoggingService.logResponseError('ERROR deleting aircraft', err);
                    return throwError(err);
                })
            );
    }

    // endregion
}
