import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../../../user/domain/model/user';
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


@Injectable()
export class RestAircraftRepoService implements IAircraftRepoService {
    constructor(
        private http: HttpClient) {
    }


    // region aircraft list

    public readAircraftList(user: User): Observable<AircraftListEntry[]> {
        const url: string = environment.aircraftServiceUrl + '?token=' + user.token;

        return this.http
            .get<IRestAircraftListResponse>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAircraftListConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading aircraft list', err);
                    return throwError(err);
                })
            );
    }

    // endregion


    // region aircraft CRUD

    public readAircraft(aircraftId: number, user: User): Observable<Aircraft> {
        const url = environment.aircraftServiceUrl + '?id=' + aircraftId + '&token=' + user.token;

        return this.http
            .get<IRestAircraftResponse>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAircraftResponseConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading aircraft', err);
                    return throwError(err);
                })
            );
    }


    public saveAircraft(aircraft: Aircraft, user: User): Observable<Aircraft> {
        const requestBody = {
            aircraft: RestAircraftConverter.toRest(aircraft),
            token: user.token
        };
        if (aircraft.id > 0) {
            return this.http
                .put<IRestAircraftResponse>(environment.aircraftServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                    map(response => RestAircraftConverter.fromRest(response.body.aircraft)),
                    catchError(err => {
                        LoggingService.logResponseError('ERROR updating aircraft', err);
                        return throwError(err);
                    })
                );
        } else {
            return this.http
                .post<IRestAircraftResponse>(environment.aircraftServiceUrl, JSON.stringify(requestBody), {observe: 'response'})
                .pipe(
                    map(response => RestAircraftConverter.fromRest(response.body.aircraft)),
                    catchError(err => {
                        LoggingService.logResponseError('ERROR creating aircraft', err);
                        return throwError(err);
                    })
                );
        }
    }


    public duplicateAircraft(aircraftId: number, user: User): Observable<Aircraft> {
        const requestBody = {
            id: aircraftId,
            token: user.token
        };
        return this.http
            .post<IRestAircraftResponse>(environment.aircraftServiceUrl, JSON.stringify(requestBody), {observe: 'response'})
            .pipe(
                map(response => RestAircraftConverter.fromRest(response.body.aircraft)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR duplicating aircraft', err);
                    return throwError(err);
                })
            );
    }


    public deleteAircraft(aircraftId: number, user: User): Observable<boolean> {
        const url = environment.aircraftServiceUrl + '?id=' + aircraftId + '&token=' + user.token;

        return this.http
            .delete<IRestSuccessResponse>(url, {observe: 'response'})
            .pipe(
                map(response => response.body.success),
                catchError(err => {
                    LoggingService.logResponseError('ERROR deleting aircraft', err);
                    return throwError(err);
                })
            );
    }

    // endregion
}
