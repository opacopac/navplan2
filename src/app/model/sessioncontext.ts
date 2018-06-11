import {User} from './user';
import {Position2d} from './position';
import {MapbaselayerType} from './ol-model/mapbaselayer-factory';
import {Track} from './track';
import {Flightroute2} from './flightroute-model/flightroute2';
import {Waypoint2} from './flightroute-model/waypoint2';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Altitude} from './altitude';
import {Angle} from './units/angle';
import {RxService} from '../services/utils/rx.service';


export class Sessioncontext {
    public sessionId: number;
    public user: User;
    public settings: Globalsettings;
    public map: Mapsettings;
    public track: Track;
    private readonly flightRouteSource: BehaviorSubject<Flightroute2>;
    private readonly selectedWaypointSource: BehaviorSubject<Waypoint2>;
    private readonly editWaypointSource: BehaviorSubject<boolean>;


    constructor() {
        this.flightRouteSource = new BehaviorSubject<Flightroute2>(new Flightroute2());
        this.selectedWaypointSource = new BehaviorSubject<Waypoint2>(undefined);
        this.editWaypointSource = new BehaviorSubject<boolean>(false);
    }


    get selectedWaypoint$(): Observable<Waypoint2> {
        return this.selectedWaypointSource.asObservable();
    }


    set selectedWaypoint(value: Waypoint2) {
        this.selectedWaypointSource.next(value);
    }


    get selectedWaypointIsNew$(): Observable<boolean> {
        return Observable.combineLatest(
            this.selectedWaypoint$,
            this.flightrouteWaypoints$)
            .map(([selectedWaypoint, wpList]) => wpList.indexOf(selectedWaypoint) >= 0)
            .distinctUntilChanged();
    }


    get selectedWaypointIsAlternate$(): Observable<boolean> {
        return Observable.combineLatest(
            this.selectedWaypoint$,
            this.flightroute$.flatMap(route => route.waypointList.alternate$))
            .map(([selectedWaypoint, alternate]) => selectedWaypoint === alternate)
            .distinctUntilChanged();
    }


    get flightroute$(): Observable<Flightroute2> {
        return this.flightRouteSource.asObservable();
    }


    set flightroute(value: Flightroute2) {
        this.flightRouteSource.next(value);
    }


    get flightrouteWaypoints$(): Observable<Waypoint2[]> {
        return Observable.combineLatest(
            this.flightroute$.flatMap(route =>
                route ? route.waypointList.items$ : RxService.getEternal<Waypoint2[]>([])))
            .flatMap(items => items);
    }


    get editWaypointActive$(): Observable<boolean> {
        return this.editWaypointSource.asObservable();
    }


    set editWaypointActive(value: boolean) {
        this.editWaypointSource.next(value);
    }
}


export class Globalsettings {
    constructor(
        public variation: Angle,
        public maxTrafficAltitude: Altitude) {
    }
}


export class Mapsettings {
    constructor(
        public baseMapType: MapbaselayerType,
        public position: Position2d,
        public zoom: number,
        public rotation: Angle) {
    }
}
