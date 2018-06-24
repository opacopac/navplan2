import {User} from './user';
import {Track} from '../track';
import {Flightroute2} from '../flightroute/flightroute2';
import {Waypoint2} from '../flightroute/waypoint2';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {RxService} from '../../services/utils/rx.service';
import {FlightrouteListEntry} from '../flightroute/flightroute-list-entry';
import {Globalsettings} from './globalsettings';
import {Mapsettings} from './mapsettings';


export class Sessioncontext {
    public readonly settings: Globalsettings;
    public readonly map: Mapsettings;
    private readonly userSource: BehaviorSubject<User>;
    private readonly flightRouteListSource: BehaviorSubject<FlightrouteListEntry[]>;
    private readonly flightRouteSource: BehaviorSubject<Flightroute2>;
    private readonly selectedWaypointSource: BehaviorSubject<Waypoint2>;
    private readonly editWaypointSource: BehaviorSubject<boolean>;
    private readonly trackListSource: BehaviorSubject<Track[]>;
    private readonly trackSource: BehaviorSubject<Track>;


    constructor(
        public readonly sessionId: number) {
        this.settings = new Globalsettings();
        this.map = new Mapsettings();
        this.userSource = new BehaviorSubject<User>(undefined);
        this.flightRouteListSource = new BehaviorSubject<Flightroute2[]>([]);
        this.flightRouteSource = new BehaviorSubject<Flightroute2>(new Flightroute2());
        this.selectedWaypointSource = new BehaviorSubject<Waypoint2>(undefined);
        this.editWaypointSource = new BehaviorSubject<boolean>(false);
        this.trackListSource = new BehaviorSubject<Track[]>([]);
        this.trackSource = new BehaviorSubject<Track>(undefined);
    }


    get user$(): Observable<User> {
        return this.userSource.asObservable();
    }


    set user(value: User) {
        this.userSource.next(value);
    }


    get isLoggedIn$(): Observable<boolean> {
        return this.user$
            .map(user => user !== undefined && user.email !== undefined && user.token !== undefined);
    }


    get isSelf$(): Observable<boolean> {
        return this.user$
            .map(user => user !== undefined && user.email === 'armand@tschanz.com');
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
            this.flightroute$.switchMap(route => route.waypointList.alternate$))
            .map(([selectedWaypoint, alternate]) => selectedWaypoint === alternate)
            .distinctUntilChanged();
    }


    get flightrouteList$(): Observable<FlightrouteListEntry[]> {
        return this.flightRouteListSource.asObservable();
    }


    set flightrouteList(value: FlightrouteListEntry[]) {
        this.flightRouteListSource.next(value);
    }


    get flightroute$(): Observable<Flightroute2> {
        return this.flightRouteSource.asObservable();
    }


    set flightroute(value: Flightroute2) {
        this.flightRouteSource.next(value);
    }


    get flightrouteWaypoints$(): Observable<Waypoint2[]> {
        return Observable.combineLatest(
            this.flightroute$.switchMap(route =>
                route ? route.waypointList.items$ : RxService.getEternal<Waypoint2[]>([])))
            .switchMap(items => items);
    }


    get editWaypointActive$(): Observable<boolean> {
        return this.editWaypointSource.asObservable();
    }


    set editWaypointActive(value: boolean) {
        this.editWaypointSource.next(value);
    }


    get track$(): Observable<Track> {
        return this.trackSource.asObservable();
    }


    set track(value: Track) {
        this.trackSource.next(value);
    }
}
