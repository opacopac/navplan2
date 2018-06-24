import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../utils/logging.service';
import {FlightrouteListResponse, FlightrouteResponse, RestMapperFlightroute } from '../../model/rest-mapper/rest-mapper-flightroute';
import {Flightroute2} from '../../model/flightroute/flightroute2';
import {Observable} from 'rxjs/Observable';
import {FlightrouteListEntry} from '../../model/flightroute/flightroute-list-entry';


const flightrouteBaseUrl = environment.restApiBaseUrl + 'php/navplan.php';


@Injectable()
export class FlightrouteService {
    constructor(
        private http: HttpClient) {
    }


    // region flightroute list

    public readFlightrouteList(email: string, token: string): Observable<FlightrouteListEntry[]> {
        const url: string = flightrouteBaseUrl + '?email=' + email + '&token=' + token;
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

    public readFlightroute(flightrouteId: number, email: string, token: string): Observable<Flightroute2> {
        const url = flightrouteBaseUrl + '?id=' + flightrouteId + '&email=' + email + '&token=' + token;
        // let message: string;

        return this.http
            .get<FlightrouteResponse>(url, {observe: 'response'})
            .catch((err, subject) => {
                LoggingService.logResponseError('ERROR reading flight route', err);
                return subject;
            })
            .map((response) => RestMapperFlightroute.getFlightrouteFromResponse2(response.body));
    }


    public createFlightroute(globalData): void {
        // return $http.post(navplanBaseUrl, obj2json({ globalData: globalData }));
    }


    public updateFlightroute(globalData): void {
        // return $http.put(navplanBaseUrl, obj2json({ globalData: globalData }));
    }


    public deleteFlightroute(navplan_id): void {
        // return $http.delete(navplanBaseUrlGet + '&id=' + navplan_id);
    }

    // endregion


    // region shared flightroute CRUD

    public createSharedFlightroute(globalData): void {
        // return $http.post(navplanBaseUrl, obj2json({ createShared: true, globalData: globalData }));
    }


    public readSharedFlightroute(share_id): void {
        // return $http.get(navplanBaseUrlGet + '&shareid=' + share_id);
    }

    // endregion
}
