import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../utils/logging.service';
import {FlightrouteListResponse, FlightrouteResponse, RestMapperFlightroute } from '../../model/rest-mapper/rest-mapper-flightroute';
import {Observable} from 'rxjs/Observable';
import {FlightrouteListEntry} from '../../model/flightroute/flightroute-list-entry';
import {Flightroute} from "../../flightroute/model/flightroute";
import {User} from "../../user/model/user";


const flightrouteBaseUrl = environment.restApiBaseUrl + 'php/navplan.php';


@Injectable()
export class FlightrouteService {
    constructor(
        private http: HttpClient) {
    }


    // region flightroute list

    public readFlightrouteList(user: User): Observable<FlightrouteListEntry[]> {
        const url: string = flightrouteBaseUrl + '?email=' + user.email + '&token=' + user.token;
        return this.http
            .get<FlightrouteListResponse>(url, {observe: 'response'})
            .catch((err, subject) => {
                LoggingService.logResponseError('ERROR reading flight route list', err);
                return subject;
            })
            .map((response) => RestMapperFlightroute.getFlightrouteListFromResponse(response.body));
    }

    // endregion


    // region flightroute CRUD

    public readFlightroute(flightrouteId: number, user: User): Observable<Flightroute> {
        const url = flightrouteBaseUrl + '?id=' + flightrouteId + '&email=' + user.email + '&token=' + user.token;
        // let message: string;

        return this.http
            .get<FlightrouteResponse>(url, {observe: 'response'})
            .catch((err, subject) => {
                LoggingService.logResponseError('ERROR reading flight route', err);
                return subject;
            })
            .map((response) => RestMapperFlightroute.getFlightrouteFromResponse(response.body));
    }


    public createFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        // return $http.post(navplanBaseUrl, obj2json({ globalData: globalData }));
        return Observable.of(undefined);
    }


    public duplicateFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        // return $http.post(navplanBaseUrl, obj2json({ globalData: globalData }));
        return Observable.of(undefined);
    }


    public updateFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        // return $http.put(navplanBaseUrl, obj2json({ globalData: globalData }));
        return Observable.of(undefined);
    }


    public deleteFlightroute(flightrouteId: number, user: User): Observable<void> {
        // return $http.delete(navplanBaseUrlGet + '&id=' + navplan_id);
        return Observable.of(undefined);
    }

    // endregion


    // region shared flightroute CRUD

    public createSharedFlightroute(flightroute: Flightroute): Observable<string> {
        // return $http.post(navplanBaseUrl, obj2json({ createShared: true, globalData: globalData }));
        return Observable.of(undefined);
    }


    public readSharedFlightroute(shareId: string): Observable<Flightroute> {
        // return $http.get(navplanBaseUrlGet + '&shareid=' + share_id);
        return Observable.of(undefined);
    }

    // endregion
}
