import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Sessioncontext} from '../../model/sessioncontext';
import {SessionService} from '../session/session.service';
import {LoggingService} from '../utils/logging.service';
import {Flightroute} from '../../model/flightroute';
import {Aircraft} from '../../model/aircraft';
import { FlightrouteListResponse, FlightrouteResponse, RestMapperFlightroute } from '../../model/rest-model/rest-mapper-flightroute';
import {Waypoint, Waypointtype} from '../../model/waypoint';
import {GeocalcService} from '../utils/geocalc.service';
import {StringnumberService} from '../utils/stringnumber.service';
import {ArrayService} from '../utils/array.service';
import {Flightroute2} from '../../model/flightroute-model/flightroute2';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/catch';


const flightrouteBaseUrl = environment.restApiBaseUrl + 'php/navplan.php';
const ADDITIONAL_VAC_TIME_MIN = 5;
const VAC_STRING = 'VAC';


@Injectable()
export class FlightrouteService {
    public routeList$: Observable<Flightroute[]>;
    public currentRoute$: Observable<Flightroute>;
    public editWaypointClicked$: Observable<Waypoint>;
    public currentRoute: Flightroute; // TODO: temp public
    private routeListSource: BehaviorSubject<Flightroute[]>;
    private currentRouteSource: BehaviorSubject<Flightroute>;
    private editWaypointClickedSource: Subject<Waypoint>;
    private session: Sessioncontext;


    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {

        this.session = sessionService.getSessionContext();
        this.routeListSource = new BehaviorSubject<Flightroute[]>([]);
        this.routeList$ = this.routeListSource.asObservable();
        this.currentRoute = new Flightroute();
        this.currentRouteSource = new BehaviorSubject(this.currentRoute);
        this.currentRoute$ = this.currentRouteSource.asObservable();
        this.editWaypointClickedSource = new Subject<Waypoint>();
        this.editWaypointClicked$ = this.editWaypointClickedSource.asObservable();
    }


    // region flightroute list

    public readFlightrouteList() {
        const url: string = flightrouteBaseUrl + '?email=' + this.session.user.email + '&token=' + this.session.user.token;
        let message: string;
        this.http
            .get<FlightrouteListResponse>(url, {observe: 'response'})
            .subscribe(
                response => {
                    const flightrouteList = RestMapperFlightroute.getFlightrouteListFromResponse(response.body);
                    this.routeListSource.next(flightrouteList);
                },
                err => {
                    message = 'ERROR reading flight route list!';
                    LoggingService.logResponseError(message, err);
                }
            );
    }

    // endregion


    // region flightroute CRUD

    public readFlightroute(flightrouteId: number): Observable<Flightroute2> {
        const url = flightrouteBaseUrl + '?id=' + flightrouteId + '&email=' + this.session.user.email + '&token=' + this.session.user.token;
        //let message: string;

        return this.http
            .get<FlightrouteResponse>(url, {observe: 'response'})
            .catch((err, subject) => {
                LoggingService.logResponseError('ERROR reading flight route', err);
                return subject;
            })
            .map((response) => RestMapperFlightroute.getFlightrouteFromResponse2(response.body))


        /*.subscribe(
            response => {
                // TODO: old
                this.currentRoute = RestMapperFlightroute.getFlightrouteFromResponse(response.body);
                this.recalcWaypoints();
                this.recalcFuel();
                this.currentRouteSource.next(this.currentRoute);

                // TODO: new
                this.session.setFlightroute(
                    RestMapperFlightroute.getFlightrouteFromResponse2(response.body)
                );
            },
            err => {
                message = 'ERROR reading flight route!';
                LoggingService.logResponseError(message, err);
            }
        );*/
    }


    public createFlightroute(globalData): void {
        // return $http.post(navplanBaseUrl, obj2json({ globalData: globalData }));
    }


    public updateFlightroute(globalData): void {
        // return $http.put(navplanBaseUrl, obj2json({ globalData: globalData }));
    }


    public deleteFlightroute(navplan_id): void {
        //return $http.delete(navplanBaseUrlGet + '&id=' + navplan_id);
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


    // region waypoints


    public addWaypointToRoute(waypoint: Waypoint, index: number) {
        // skip if coordinates identical as preceeding waypoint
        if (index < this.currentRoute.waypoints.length && this.currentRoute.waypoints[index].position.equals(waypoint.position)) {
            return;
        }

        ArrayService.insertAt(this.currentRoute.waypoints, index, waypoint);
        this.recalcWaypoints();
        this.recalcFuel();
        this.currentRouteSource.next(this.currentRoute);
    }


    public removeWaypointFromRoute(waypoint: Waypoint) {
        ArrayService.removeFromArray(this.currentRoute.waypoints, waypoint);
        this.recalcWaypoints();
        this.recalcFuel();
        this.currentRouteSource.next(this.currentRoute);
    }


    public setAlternate(waypoint: Waypoint) {
        this.currentRoute.alternate = waypoint;
        this.recalcWaypoints();
        this.recalcFuel();
        this.currentRouteSource.next(this.currentRoute);
    }


    public removeAlternateFromRoute() {
        this.currentRoute.alternate = undefined;
        this.recalcWaypoints();
        this.recalcFuel();
        this.currentRouteSource.next(this.currentRoute);
    }


    public updateWaypoint(index: number, newWaypoint: Waypoint) {
        this.currentRoute.waypoints[index] = newWaypoint;
        this.recalcWaypoints();
        this.recalcFuel();
        this.currentRouteSource.next(this.currentRoute);
    }


    // trigger the modal dialog
    public editWaypoint(waypoint: Waypoint) {
        this.editWaypointClickedSource.next(waypoint);
    }


    public reverseWaypoints() {
        if (this.currentRoute.waypoints.length === 0) {
            return;
        }

        const wpTmpList: Waypoint[] = [];

        for (let i = this.currentRoute.waypoints.length - 1; i >= 0; i--) {
            wpTmpList.push(this.currentRoute.waypoints[i]);
        }

        this.currentRoute.waypoints = [];

        for (let i = 0; i < wpTmpList.length; i++) {
            this.currentRoute.waypoints.push(wpTmpList[i]);
        }

        this.recalcWaypoints();
        this.recalcFuel();
        this.currentRouteSource.next(this.currentRoute);
    }


    public updateAircraftForRoute(aircraft: Aircraft) {
        this.currentRoute.aircraft = aircraft;

        this.recalcWaypoints();
        this.recalcFuel();
        this.currentRouteSource.next(this.currentRoute);
    }


    private recalcWaypoints() {
        let prevWp: Waypoint;
        let variation: number;

        // waypoints
        for (let i = 0; i < this.currentRoute.waypoints.length; i++) {
            // vac time for start/end +5
            if ((i === 1 && this.currentRoute.waypoints[0].type === Waypointtype.airport)
                || (i === this.currentRoute.waypoints.length - 1 && this.currentRoute.waypoints[i].type === Waypointtype.airport)) {
                this.currentRoute.waypoints[i].vacTime = ADDITIONAL_VAC_TIME_MIN;
            } else {
                this.currentRoute.waypoints[i].vacTime = 0;
            }


            // recalc distance & bearing
            if (i > 0) {
                prevWp = this.currentRoute.waypoints[i - 1];
                variation = prevWp.variation;
            } else {
                prevWp = undefined;
                variation = this.currentRoute.waypoints[i].variation;
            }

            this.recalcLeg(this.currentRoute.waypoints[i], prevWp, false, variation, this.currentRoute.aircraft.speed);
        }

        // alternate
        if (this.currentRoute.alternate) {
            // vac time +5
            this.currentRoute.alternate.vacTime = ADDITIONAL_VAC_TIME_MIN;

            if (this.currentRoute.waypoints.length > 0) {
                prevWp = this.currentRoute.waypoints[this.currentRoute.waypoints.length - 1];
                variation = prevWp.variation;
            } else {
                prevWp = undefined;
                variation = this.currentRoute.alternate.variation;
            }

            this.recalcLeg(this.currentRoute.alternate, prevWp, true, variation, this.currentRoute.aircraft.speed);
        }
    }


    private recalcLeg(wp: Waypoint, prevWp: Waypoint, isAlternate: boolean, magvar: number, speed: number) {
        // distance & bearing
        if (prevWp) {
            wp.dist = Math.ceil(GeocalcService.getDistance_old(wp.position, prevWp.position));
            wp.mt = Math.round(GeocalcService.getBearing_old(prevWp.position, wp.position, magvar));
        } else {
            wp.dist = undefined;
            wp.mt = undefined;
        }

        // format mt / dist / eet
        wp.mtText = this.getMtText(wp, isAlternate);
        wp.distText = this.getDistText(wp);
        wp.eetText = this.getEetText(wp, speed);
    }


    private getMtText(wp: Waypoint, isAlternate: boolean): string {
        if (!wp || !wp.mt) {
            return '';
        } else if (wp.vacTime > 0 && !isAlternate) {
            return VAC_STRING;
        } else {
            return StringnumberService.zeroPad(wp.mt, 3);
        }
    }


    private getDistText(wp): string {
        if (!wp || !wp.dist) {
            return '';
        } else {
            return '' + Math.ceil(wp.dist);
        }
    }


    private getEetText(wp, speed): string {
        if (!wp || !wp.dist || wp.dist <= 0 || !speed || speed <= 0) {
            return '';
        }

        const eet = '' + Math.ceil(wp.dist / speed * 60);

        if (wp.vacTime > 0) {
            return eet + '/+' + wp.vacTime;
        } else {
            return eet;
        }
    }

    // endregion


    // region fuel

    private recalcFuel() {
        this.currentRoute.fuel.tripTime = 0;
        this.currentRoute.fuel.alternateTime = 0;

        for (let i = 0; i < this.currentRoute.waypoints.length; i++) {
            this.currentRoute.fuel.tripTime += this.getEetMin(this.currentRoute.waypoints[i], this.currentRoute.aircraft.speed);
        }

        if (this.currentRoute.alternate) {
            this.currentRoute.fuel.alternateTime = this.getEetMin(this.currentRoute.alternate, this.currentRoute.aircraft.speed);
        }
    }


    private getEetMin(wp: Waypoint, speedKt: number): number {
        if (!wp || !wp.dist || wp.dist <= 0 || !speedKt || speedKt <= 0) {
            return 0;
        }

        const eet = Math.ceil(wp.dist / speedKt * 60);

        if (wp.vacTime > 0) {
            return eet + wp.vacTime;
        } else {
            return eet;
        }
    }

    // endregion
}
