import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {FlightrouteListEntry} from '../domain-model/flightroute-list-entry';
import {User} from '../../user/domain-model/user';
import {Flightroute} from '../domain-model/flightroute';
import {IRestFlightrouteListResponse} from '../rest-model/i-rest-flightroute-list-response';
import {IRestFlightrouteResponse} from '../rest-model/i-rest-flightroute-response';
import {RestFlightrouteResponseConverter} from '../rest-model/rest-flightroute-response-converter';
import {RestFlightrouteListConverter} from '../rest-model/rest-flightroute-list-converter';
import {IFlightrouteService} from '../domain-service/i-flightroute-service';


@Injectable()
export class FlightrouteRestService implements IFlightrouteService {
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
        return of(undefined);
    }


    public duplicateFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        // return $http.post(navplanBaseUrl, obj2json({ globalData: globalData }));
        return of(undefined);
    }


    public deleteFlightroute(flightrouteId: number, user: User): Observable<void> {
        // return $http.delete(navplanBaseUrlGet + '&id=' + navplan_id);
        return of(undefined);
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
