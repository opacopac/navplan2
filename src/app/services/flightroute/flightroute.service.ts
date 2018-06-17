import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Sessioncontext} from '../../model/sessioncontext';
import {SessionService} from '../session/session.service';
import {LoggingService} from '../utils/logging.service';
import {FlightrouteListResponse, FlightrouteResponse, RestMapperFlightroute } from '../../model/rest-model/rest-mapper-flightroute';
import {Flightroute2} from '../../model/flightroute-model/flightroute2';
import {Observable} from 'rxjs/Observable';
import {FlightrouteListEntry} from '../../model/flightroute-model/flightroute-list-entry';


const flightrouteBaseUrl = environment.restApiBaseUrl + 'php/navplan.php';


@Injectable()
export class FlightrouteService {
    private session: Sessioncontext;


    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {

        this.session = sessionService.getSessionContext();
    }


    // region flightroute list

    public readFlightrouteList(): Observable<FlightrouteListEntry[]> {
        const url: string = flightrouteBaseUrl + '?email=' + this.session.user.email + '&token=' + this.session.user.token;
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

    public readFlightroute(flightrouteId: number): Observable<Flightroute2> {
        const url = flightrouteBaseUrl + '?id=' + flightrouteId + '&email=' + this.session.user.email + '&token=' + this.session.user.token;
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
