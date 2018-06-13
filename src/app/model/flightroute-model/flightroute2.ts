import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import {WaypointList} from './waypoint-list';
import {Routefuel2} from './routefuel2';
import {Aircraft2} from './aircraft2';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Speed} from '../units/speed';
import {RxService} from '../../services/utils/rx.service';
import {Time} from '../units/time';


export class Flightroute2 {
    public readonly fuel: Routefuel2;
    public readonly waypointList: WaypointList;
    private readonly idSource: BehaviorSubject<number>;
    private readonly titleSource: BehaviorSubject<string>;
    private readonly commentsSource: BehaviorSubject<string>;
    private readonly aircraftSource: BehaviorSubject<Aircraft2>;


    constructor(
        id?: number,
        title = '',
        comments = '') {

        this.idSource = new BehaviorSubject<number>(id);
        this.titleSource = new BehaviorSubject<string>(title);
        this.commentsSource = new BehaviorSubject<string>(comments);
        this.aircraftSource = new BehaviorSubject<Aircraft2>(new Aircraft2());
        this.waypointList = new WaypointList([], this.speed$);
        this.fuel = new Routefuel2(
            this.aircraft$.flatMap((aircraft) => aircraft.consumption$),
            this.waypointList.legTimeSum$,
            this.waypointList.alternate$.flatMap(wp => wp ? wp.eet$ : RxService.getEternal<Time>()));
    }


    get id$(): Observable<number> {
        return this.idSource.asObservable();
    }


    set id(value: number) {
        this.idSource.next(value);
    }


    get title$(): Observable<string> {
        return this.titleSource.asObservable();
    }


    set title(value: string) {
        this.titleSource.next(value);
    }


    get comments$(): Observable<string> {
        return this.commentsSource.asObservable();
    }


    set comments(value: string) {
        this.commentsSource.next(value);
    }


    get aircraft$(): Observable<Aircraft2> {
        return this.aircraftSource.asObservable();
    }


    set aircraft(value: Aircraft2) {
        this.aircraftSource.next(value);
    }


    get speed$(): Observable<Speed> {
        return this.aircraft$
            .flatMap(ac => ac ? ac.speed$ : RxService.getEternal<Speed>());
    }
}
