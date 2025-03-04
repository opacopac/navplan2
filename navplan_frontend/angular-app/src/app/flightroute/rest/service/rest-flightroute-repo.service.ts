import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {FlightrouteListEntry} from '../../domain/model/flightroute-list-entry';
import {Flightroute} from '../../domain/model/flightroute';
import {IRestFlightrouteListResponse} from '../model/i-rest-flightroute-list-response';
import {IRestFlightrouteResponse} from '../model/i-rest-flightroute-response';
import {RestFlightrouteResponseConverter} from '../converter/rest-flightroute-response-converter';
import {RestFlightrouteListConverter} from '../converter/rest-flightroute-list-converter';
import {IFlightrouteRepoService} from '../../domain/service/i-flightroute-repo.service';
import {RestFlightrouteConverter} from '../converter/rest-flightroute-converter';
import {IRestSuccessResponse} from '../model/i-rest-success-response';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';


@Injectable()
export class RestFlightrouteRepoService implements IFlightrouteRepoService {
    constructor(
        private http: HttpClient) {
    }


    // region flightroute list

    public readFlightrouteList(): Observable<FlightrouteListEntry[]> {
        const url: string = environment.flightrouteServiceUrl;

        return this.http
            .get<IRestFlightrouteListResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map((response) => RestFlightrouteListConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading flight route list', err);
                    return throwError(err);
                })
            );
    }

    // endregion


    // region flightroute CRUD

    public readFlightroute(flightrouteId: number): Observable<Flightroute> {
        const url = environment.flightrouteServiceUrl + '?id=' + flightrouteId;

        return this.http
            .get<IRestFlightrouteResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map((response) => RestFlightrouteResponseConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading flight route', err);
                    return throwError(err);
                })
            );
    }


    public saveFlightroute(flightroute: Flightroute): Observable<Flightroute> {
        const requestBody = {navplan: RestFlightrouteConverter.toRest(flightroute)};

        if (flightroute.id > 0) {
            return this.http
                .put<IRestFlightrouteResponse>(
                    environment.flightrouteServiceUrl,
                    JSON.stringify(requestBody),
                    HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
                ).pipe(
                    map(response => RestFlightrouteConverter.fromRest(response.body.navplan))
                );
        } else {
            return this.http
                .post<IRestFlightrouteResponse>(
                    environment.flightrouteServiceUrl,
                    JSON.stringify(requestBody),
                    HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
                ).pipe(
                    map(response => RestFlightrouteConverter.fromRest(response.body.navplan))
                );
        }
    }


    public duplicateFlightroute(flightrouteId: number): Observable<Flightroute> {
        const url = environment.flightrouteServiceUrl + '?id=' + flightrouteId + '&action=duplicate';
        const requestBody = {navplan: null};

        return this.http
            .post<IRestFlightrouteResponse>(
                url,
                JSON.stringify(requestBody),
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            ).pipe(
                map(response => RestFlightrouteConverter.fromRest(response.body.navplan))
            );
    }


    public deleteFlightroute(flightrouteId: number): Observable<boolean> {
        const url = environment.flightrouteServiceUrl + '?id=' + flightrouteId;

        return this.http
            .delete<IRestSuccessResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map((response) => response.body.success),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading flight route', err);
                    return throwError(err);
                })
            );
    }

    // endregion


    // region shared flightroute CRUD

    public createSharedFlightroute(flightroute: Flightroute): Observable<string> {
        // return $http.post(navplanBaseUrl, obj2json({ createShared: true, globalData: globalData }));
        return of(undefined);
    }


    public readSharedFlightroute(shareId: string): Observable<Flightroute> {
        // return $http.get(navplanBaseUrlGet + '&shareid=' + share_id);
        return of(undefined);
    }

    // endregion
}
