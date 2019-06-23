import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {FlightrouteListEntry} from '../domain/flightroute-list-entry';
import {User} from '../../user/domain/user';
import {Flightroute} from '../domain/flightroute';
import {IRestFlightrouteListResponse} from './i-rest-flightroute-list-response';
import {IRestFlightrouteResponse} from './i-rest-flightroute-response';
import {RestFlightrouteResponse} from './rest-flightroute-response';
import {RestFlightrouteList} from './rest-flightroute-list';


const flightrouteBaseUrl = environment.restApiBaseUrl + 'php/Navplan/Flightroute/FlightrouteService.php';


@Injectable({
    providedIn: 'root'
})
export class FlightrouteService {
    constructor(
        private http: HttpClient) {
    }


    // region flightroute list

    public readFlightrouteList(user: User): Observable<FlightrouteListEntry[]> {
        const url: string = flightrouteBaseUrl + '?token=' + user.token;
        return this.http
            .get<IRestFlightrouteListResponse>(url, {observe: 'response'})
            .pipe(
                map((response) => RestFlightrouteList.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading flight route list', err);
                    return throwError(err);
                })
            );
    }

    // endregion


    // region flightroute CRUD

    public readFlightroute(flightrouteId: number, user: User): Observable<Flightroute> {
        const url = flightrouteBaseUrl + '?id=' + flightrouteId + '&token=' + user.token;
        // let message: string;

        return this.http
            .get<IRestFlightrouteResponse>(url, {observe: 'response'})
            .pipe(
                map((response) => RestFlightrouteResponse.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading flight route', err);
                    return throwError(err);
                })
            );
    }


    public createFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        // return $http.post(navplanBaseUrl, obj2json({ globalData: globalData }));
        return of(undefined);
    }


    public duplicateFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        // return $http.post(navplanBaseUrl, obj2json({ globalData: globalData }));
        return of(undefined);
    }


    public updateFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        // return $http.put(navplanBaseUrl, obj2json({ globalData: globalData }));
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
