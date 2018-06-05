import { Waypoint2 } from "./waypoint2";
import { Routefuel2 } from "./routefuel2";
import { Aircraft2 } from "./aircraft2";
import { ObservableArray } from "../observable-array";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from "rxjs/Subscription";
import {Time} from "../units/time";
import {TimeUnit} from "../../services/utils/unitconversion.service";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';


export class Flightroute2 {
    public readonly id$: Observable<number>;
    public readonly title$: Observable<string>;
    public readonly comments$: Observable<string>;
    public readonly aircraft$: Observable<Aircraft2>;
    public readonly alternate$: Observable<Waypoint2>;
    public readonly fuel: Routefuel2;
    public readonly waypointList: ObservableArray<Waypoint2>;
    private readonly idSource: BehaviorSubject<number>;
    private readonly titleSource: BehaviorSubject<string>;
    private readonly commentsSource: BehaviorSubject<string>;
    private readonly aircraftSource: BehaviorSubject<Aircraft2>;
    private readonly alternateSource: BehaviorSubject<Waypoint2>;
    private readonly tripTime$: Observable<Time>;
    private readonly waypointListSubscription: Subscription;


    constructor(
        id: number = undefined,
        title = '',
        comments = '') {

        this.idSource = new BehaviorSubject<number>(id);
        this.id$ = this.idSource.asObservable();
        this.titleSource = new BehaviorSubject<string>(title);
        this.title$ = this.titleSource.asObservable();
        this.commentsSource = new BehaviorSubject<string>(comments);
        this.comments$ = this.commentsSource.asObservable();
        this.aircraftSource = new BehaviorSubject<Aircraft2>(new Aircraft2());
        this.aircraft$ = this.aircraftSource.asObservable();
        this.alternateSource = new BehaviorSubject<Waypoint2>(undefined);
        this.alternate$ = this.alternateSource.asObservable();
        this.waypointList = new ObservableArray<Waypoint2>([]);
        this.tripTime$ = this.waypointList.items$.flatMap(
            wpList => Observable.combineLatest(wpList.map(wp => wp.legTime$))
                .map(numberList => numberList.reduce((sum, legTime) =>
                    sum.add(legTime), new Time(0, TimeUnit.M))
                )
        );
        this.fuel = new Routefuel2(
            this.aircraft$.flatMap((aircraft) => aircraft.consumption$),
            this.tripTime$,
            this.alternate$.flatMap(wp => wp.legTime$));

        // subscriptions
        this.waypointList.items$
            .distinctUntilChanged()
            .subscribe((wpList) => {
                this.updateWaypointDependencies(wpList);
            });
    }


    destroy() {
        this.waypointListSubscription.unsubscribe();
    }


    set id(value: number) {
        this.idSource.next(value);
    }


    set title(value: string) {
        this.titleSource.next(value);
    }


    set comments(value: string) {
        this.commentsSource.next(value);
    }


    set aircraft(value: Aircraft2) {
        this.aircraftSource.next(value);
    }


    set alternate(value: Waypoint2) {
        value.speedObservable = this.aircraft$.flatMap((aircraft) => {
            return aircraft ? aircraft.speed$ : undefined;
        });
        value.previousPositionObservable = this.waypointList.items$.flatMap((wpList) => {
            if (!wpList || wpList.length < 1) {
                return undefined;
            } else {
                return wpList[wpList.length - 1].position$;
            }
        });
        this.alternateSource.next(value);
    }


    private updateWaypointDependencies(wpList: Waypoint2[]) {
        wpList.map((wp, index) => {
            if (index > 0) {
                wp.previousPositionObservable = wpList[index - 1].position$;
            } else {
                wp.previousPositionObservable = undefined;
            }

            if (index < wpList.length - 1) {
                wp.nextMtObservable = wpList[index + 1].mt$;
            } else {
                wp.nextMtObservable = undefined;
            }

            wp.speedObservable = this.aircraft$.flatMap((aircraft) => {
                return aircraft ? aircraft.speed$ : undefined;
            });
        });
    }
}
