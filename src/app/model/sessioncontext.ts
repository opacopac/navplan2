import { User } from './user';
import { Position2d } from './position';
import { MapbaselayerType } from './ol-model/mapbaselayer-factory';
import { Track } from './track';
import { Waypoint } from "./waypoint";
import { Flightroute2} from "./stream-model/flightroute2";
import { Waypoint2 } from "./stream-model/waypoint2";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


export class Sessioncontext {
    public sessionId: number;
    public user: User;
    public settings: Globalsettings;
    public map: Mapsettings;
    public track: Track;
    public selectedWaypoint: Waypoint;
    public readonly flightroute$: Observable<Flightroute2>;
    private readonly flightRouteSource: BehaviorSubject<Flightroute2>;
    public readonly selectedWaypoint$: Observable<Waypoint2>;
    private readonly selectedWaypointSource: BehaviorSubject<Waypoint2>;
    public readonly editWaypointActive$: Observable<boolean>;
    private readonly editWaypointActiveSource: BehaviorSubject<boolean>;


    constructor() {
        this.flightRouteSource = new BehaviorSubject<Flightroute2>(new Flightroute2());
        this.flightroute$ = this.flightRouteSource.asObservable();
        this.selectedWaypointSource = new BehaviorSubject<Waypoint2>(undefined);
        this.selectedWaypoint$ = this.selectedWaypointSource.asObservable();
        this.editWaypointActiveSource = new BehaviorSubject<boolean>(false);
        this.editWaypointActive$ = this.editWaypointActiveSource.asObservable();
    }


    setSelectedWaypoint(value: Waypoint2) {
        this.selectedWaypointSource.next(value);
    }


    setFlightroute(value: Flightroute2) {
        this.flightRouteSource.next(value);
    }


    setEditWaypointActive(value: boolean) {
        this.editWaypointActiveSource.next(value);
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
