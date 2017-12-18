import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Sessioncontext } from '../model/sessioncontext';
import { SessionService } from './session.service';
import { LoggingService} from './logging.service';
import { Aircraft, Flightroute } from '../model/flightroute';
import { Waypoint, Waypointaltitude, Waypointtype } from '../model/waypoint';


const flightrouteBaseUrl =  environment.restApiBaseUrl + 'php/navplan.php';


// region INTERFACES

interface FlightrouteListResponse {
    navplanList: FlightrouteListEntry[];
}

interface FlightrouteListEntry {
    id: number;
    title: string;
}

interface FlightrouteResponse {
    navplan: {
        id: number,
        title: string,
        aircraft_speed: number,
        aircraft_consumption: number,
        extra_fuel: number,
        comments: string,
        waypoints: FlightrouteWaypoint[],
        alternate: FlightrouteWaypoint,
    };
}

interface FlightrouteWaypoint {
    type: string;
    freq: string;
    callsign: string;
    checkpoint: string;
    airport_icao: string;
    latitude: number;
    longitude: number;
    alt: number;
    isminalt: boolean;
    ismaxalt: boolean;
    isaltatlegstart: boolean;
    remark: string;
    supp_info: string;
}

// endregion


@Injectable()
export class FlightrouteService {
    private session: Sessioncontext;


    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {

        this.session = sessionService.getSessionContext();
    }


    // region READ FLIGHTROUTE LIST

    readFlightrouteList(
        successCallback: (flightrouteList: Flightroute[]) => void,
        errorCallback: (message: string) => void) {

        const url: string = flightrouteBaseUrl + '?email=' + this.session.user.email + '&token=' + this.session.user.token;
        let message: string;
        this.http
            .get<FlightrouteListResponse>(url, {observe: 'response'})
            .subscribe(
                response => {
                    const flightrouteList = this.getFlightrouteListFromResponse(response.body);
                    successCallback(flightrouteList);
                },
                err => {
                    message = 'ERROR reading flight route list!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }


    private getFlightrouteListFromResponse(response: FlightrouteListResponse): Flightroute[] {
        if (!response.navplanList || response.navplanList.length === 0) {
            return [];
        }

        const flightrouteList: Flightroute[] = [];
        for (let i = 0; i < response.navplanList.length; i++) {
            const entry: FlightrouteListEntry = response.navplanList[i];
            const flightroute = new Flightroute(
                entry.id,
                entry.title);
            flightrouteList.push(flightroute);
        }

        return flightrouteList;
    }

    // endregion


    // region READ FLIGHTROUTE

    readFlightroute(
        flightrouteId: number,
        successCallback: (flightroute: Flightroute) => void,
        errorCallback: (message: string) => void) {

        const url = flightrouteBaseUrl + '?id=' + flightrouteId + '&email=' + this.session.user.email + '&token=' + this.session.user.token;
        let message: string;

        this.http
            .get<FlightrouteResponse>(url, {observe: 'response'})
            .subscribe(
                response => {
                    const flightroute = this.getFlightrouteFromResponse(response.body);
                    successCallback(flightroute);
                },
                err => {
                    message = 'ERROR reading flight route!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }


    private getFlightrouteFromResponse(response: FlightrouteResponse): Flightroute {
        const flightroute: Flightroute = new Flightroute(
            response.navplan.id,
            response.navplan.title,
            response.navplan.comments,
        );

        flightroute.aircraft = new Aircraft(
            response.navplan.aircraft_speed,
            response.navplan.aircraft_consumption
        );

        for (let i = 0; i < response.navplan.waypoints.length; i++) {
            const waypoint = this.getWaypointFromResponse(response.navplan.waypoints[i]);
            flightroute.waypoints.push(waypoint);
        }

        if (response.navplan.alternate) {
            flightroute.alternate = this.getWaypointFromResponse(response.navplan.alternate);
        }

        return flightroute;
    }


    private getWaypointFromResponse(entry: FlightrouteWaypoint): Waypoint {
        const waypoint = new Waypoint(
            Waypointtype[entry.type],
            entry.freq,
            entry.callsign,
            entry.checkpoint,
            entry.remark,
            entry.supp_info,
            entry.latitude,
            entry.longitude,
        );

        waypoint.alt = new Waypointaltitude(
            entry.alt,
            entry.isminalt == true, // 0: false, 1: true
            entry.ismaxalt == true, // 0: false, 1: true
            entry.isaltatlegstart == true // 0: false, 1: true
        );

        return waypoint;
    }


    // endregion


    readSharedNavplan(share_id): void {
        // return $http.get(navplanBaseUrlGet + '&shareid=' + share_id);
    }


    createNavplan(globalData): void {
        // return $http.post(navplanBaseUrl, obj2json({ globalData: globalData }));
    }


    createSharedNavplan(globalData): void {
        // return $http.post(navplanBaseUrl, obj2json({ createShared: true, globalData: globalData }));
    }


    updateNavplan(globalData): void {
        // return $http.put(navplanBaseUrl, obj2json({ globalData: globalData }));
    }


    deleteNavplan(navplan_id): void {
        //return $http.delete(navplanBaseUrlGet + '&id=' + navplan_id);
    }

}
