import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {FlightrouteListEntry} from '../../domain/model/flightroute-list-entry';
import {User} from '../../../user/domain/model/user';
import {Flightroute} from '../../domain/model/flightroute';
import {IRestFlightrouteListResponse} from '../model/i-rest-flightroute-list-response';
import {IRestFlightrouteResponse} from '../model/i-rest-flightroute-response';
import {RestFlightrouteResponseConverter} from '../converter/rest-flightroute-response-converter';
import {RestFlightrouteListConverter} from '../converter/rest-flightroute-list-converter';
import {IFlightrouteRepoService} from '../../domain/service/i-flightroute-repo.service';
import {RestFlightrouteConverter} from '../converter/rest-flightroute-converter';
import {IRestSuccessResponse} from '../model/i-rest-success-response';


@Injectable()
export class RestFlightrouteRepoService implements IFlightrouteRepoService {
    constructor(
        private http: HttpClient) {
    }


    // region flightroute list

    public readFlightrouteList(user: User): Observable<FlightrouteListEntry[]> {
        const url: string = environment.flightrouteServiceUrl + '?token=' + user.token;
        return this.http
            .get<IRestFlightrouteListResponse>(url, {observe: 'response'})
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

    public readFlightroute(flightrouteId: number, user: User): Observable<Flightroute> {
        const url = environment.flightrouteServiceUrl + '?id=' + flightrouteId + '&token=' + user.token;
        // let message: string;

        return this.http
            .get<IRestFlightrouteResponse>(url, {observe: 'response'})
            .pipe(
                map((response) => RestFlightrouteResponseConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading flight route', err);
                    return throwError(err);
                })
            );
    }


    public saveFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        const requestBody = {
            navplan: RestFlightrouteConverter.toRest(flightroute),
            token: user.token
        };
        if (flightroute.id > 0) {
            return this.http
                .put<IRestFlightrouteResponse>(environment.flightrouteServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                    map(response => RestFlightrouteConverter.fromRest(response.body.navplan))
                );
        } else {
            return this.http
                .post<IRestFlightrouteResponse>(environment.flightrouteServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                    map(response => RestFlightrouteConverter.fromRest(response.body.navplan))
                );
        }
    }


    public duplicateFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        const requestBody = {
            navplan: RestFlightrouteConverter.toRest(flightroute),
            token: user.token
        };
        return this.http
            .post<IRestFlightrouteResponse>(environment.flightrouteServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                map(response => RestFlightrouteConverter.fromRest(response.body.navplan))
            );
    }


    public deleteFlightroute(flightrouteId: number, user: User): Observable<boolean> {
        const url = environment.flightrouteServiceUrl + '?id=' + flightrouteId + '&token=' + user.token;

        return this.http
            .delete<IRestSuccessResponse>(url, {observe: 'response'})
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
