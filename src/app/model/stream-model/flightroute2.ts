import * as Rx from 'rxjs';
import {Waypoint2} from "./waypoint2";
import {Routefuel2} from "./routefuel2";
import {Aircraft2} from "./aircraft2";
import {ArrayService} from "../../services/utils/array.service";


export class Flightroute2 {
    public readonly id$: Rx.Observable<number>;
    public readonly title$: Rx.Observable<string>;
    public readonly comments$: Rx.Observable<string>;
    public readonly aircraft$: Rx.Observable<Aircraft2>;
    public readonly alternate$: Rx.Observable<Waypoint2>;
    public readonly fuel: Routefuel2;
    public readonly waypointList$: Rx.Observable<Waypoint2[]>;
    private readonly idSource: Rx.BehaviorSubject<number>;
    private readonly titleSource: Rx.BehaviorSubject<string>;
    private readonly commentsSource: Rx.BehaviorSubject<string>;
    private readonly aircraftSource: Rx.BehaviorSubject<Aircraft2>;
    private readonly alternateSource: Rx.BehaviorSubject<Waypoint2>;
    private readonly waypointListSource: Rx.BehaviorSubject<Waypoint2[]>;
    private readonly tripTime$: Rx.Observable<number>;


    constructor(
        id: number = undefined,
        title = '',
        comments = '') {

        this.idSource = new Rx.BehaviorSubject<number>(id);
        this.id$ = this.idSource.asObservable();
        this.titleSource = new Rx.BehaviorSubject<string>(title);
        this.title$ = this.titleSource.asObservable();
        this.commentsSource = new Rx.BehaviorSubject<string>(comments);
        this.comments$ = this.commentsSource.asObservable();
        this.aircraftSource = new Rx.BehaviorSubject<Aircraft2>(new Aircraft2());
        this.aircraft$ = this.aircraftSource.asObservable();
        this.alternateSource = new Rx.BehaviorSubject<Waypoint2>(undefined);
        this.alternate$ = this.alternateSource.asObservable();
        this.waypointListSource = new Rx.BehaviorSubject<Waypoint2[]>([]);
        this.waypointList$ = this.waypointListSource.asObservable();
        this.tripTime$ = this.waypointList$.flatMap(
            wpList => Rx.Observable.combineLatest(wpList.map(wp => wp.legTime$))
                .map(numberList => numberList.reduce((sum, legTime) => sum + legTime), 0)
        );
        this.fuel = new Routefuel2(
            this.aircraft$.flatMap((aircraft) => aircraft.consumption$),
            this.tripTime$,
            this.alternate$.flatMap(wp => wp.legTime$));
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
        value.previousPositionObservable = this.waypointList$.flatMap((wpList) => {
            if (!wpList || wpList.length < 1) {
                return undefined;
            } else {
                return wpList[wpList.length - 1].position$;
            }
        });
        this.alternateSource.next(value);
    }


    public updateWaypointList(waypoints: Waypoint2[]) {
        this.updateWaypointDependencies(waypoints);
        this.waypointListSource.next(waypoints);
    }


    public insertWaypoint(waypoint: Waypoint2, index: number) {
        const wpList = this.waypointListSource.getValue();
        // skip if coordinates identical as preceeding waypoint
        // TODO
        /*if (index < wpList.length  && wpList[index].position.equals(waypoint.position)) {
            return;
        }*/

        ArrayService.insertAt(wpList, index, waypoint);
        this.updateWaypointDependencies(wpList);
        this.waypointListSource.next(wpList);
    }


    public removeWaypoint(waypoint: Waypoint2) {
        const wpList = this.waypointListSource.getValue();
        ArrayService.removeFromArray(wpList, waypoint);
        this.updateWaypointDependencies(wpList);
        this.waypointListSource.next(wpList);
    }


    public replaceWaypoint(index: number, newWaypoint: Waypoint2) {
        const wpList = this.waypointListSource.getValue();
        wpList[index] = newWaypoint;
        this.updateWaypointDependencies(wpList);
        this.waypointListSource.next(wpList);
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
