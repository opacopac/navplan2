import * as Rx from 'rxjs';
import { User } from './user';
import { Position2d } from './position';
import { MapbaselayerType } from './ol-model/mapbaselayer-factory';
import { Track } from './track';
import { Waypoint } from "./waypoint";
import { Flightroute2} from "./stream-model/flightroute2";
import { Waypoint2 } from "./stream-model/waypoint2";


export class Sessioncontext {
    public sessionId: number;
    public user: User;
    public settings: Globalsettings;
    public map: Mapsettings;
    public track: Track;
    public selectedWaypoint: Waypoint;
    public readonly flightroute$: Rx.Observable<Flightroute2>;
    private readonly flightRouteSource: Rx.BehaviorSubject<Flightroute2>;
    public readonly selectedWaypoint$: Rx.Observable<Waypoint2>;
    private readonly selectedWaypointSource: Rx.BehaviorSubject<Waypoint2>;


    constructor() {
        this.flightRouteSource = new Rx.BehaviorSubject<Flightroute2>(new Flightroute2());
        this.flightroute$ = this.flightRouteSource.asObservable();
        this.selectedWaypointSource = new Rx.BehaviorSubject<Waypoint2>(undefined);
        this.selectedWaypoint$ = this.selectedWaypointSource.asObservable();
    }


    setSelectedWaypoint(waypoint: Waypoint2) {
        this.selectedWaypointSource.next(waypoint);
    }


    setFlightroute(flightroute: Flightroute2) {
        this.flightRouteSource.next(flightroute);
    }
}


export class Globalsettings {
    variationDeg: number;
    maxTrafficAltitudeFt: number;
    baseMapType: MapbaselayerType;
}


export class Mapsettings {
    position: Position2d;
    zoom: number;
}
