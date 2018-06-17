import {ObservableArray} from '../observable-array';
import {Waypoint2} from './waypoint2';
import {Observable} from 'rxjs/Observable';
import {Position2d} from '../position';
import {Time} from '../units/time';
import {TimeUnit} from '../../services/utils/unitconversion.service';
import {Speed} from '../units/speed';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';


export class WaypointList extends ObservableArray<Waypoint2> {
    private readonly alternateSource: BehaviorSubject<Waypoint2>;
    private readonly beforeNextSubscription: Subscription;


    constructor(
        waypointList: Waypoint2[],
        private readonly speed$: Observable<Speed>) {

        super(waypointList);
        waypointList.forEach(wp => wp.speedObservable = this.speed$);

        this.alternateSource = new BehaviorSubject<Waypoint2>(undefined);
        this.beforeNextSubscription = this.beforeNext$
            .subscribe((wpList) => {
                const alternate = this.alternateSource.getValue();
                this.updateDependencies(wpList, alternate);
            });

        // initial trigger manually to update dependencies
        this.beforeNextSource.next(waypointList);
    }


    get alternate$(): Observable<Waypoint2> {
        return this.alternateSource.asObservable();
    }


    set alternate(value: Waypoint2) {
        const wpList = this.itemsSource.getValue();
        const alt = this.alternateSource.getValue();
        if (alt) {
            alt.speedObservable = undefined;
        }
        if (value) {
            value.speedObservable = this.speed$;
        }
        this.updateDependencies(wpList, value);
        this.alternateSource.next(value);
    }


    get positionList$(): Observable<Position2d[]> {
        return this.items$
            .flatMap(items =>
                Observable.combineLatest<Position2d>(
                    items.map(wp => wp.position$)
                )
            );
    }


    get eetList$(): Observable<Time[]> {
        return this.items$
            .flatMap(items =>
                Observable.combineLatest<Time>(
                    items.map(wp => wp.eet$)
                )
            );
    }


    get eetSum$(): Observable<Time> {
        return this.eetList$
            .map(numberList =>
                numberList.reduce((sum, legTime) =>
                    legTime ? sum.add(legTime) : sum, new Time(0, TimeUnit.M)
                )
            );
    }


    public replaceList(waypointList: Waypoint2[]) {
        waypointList.forEach(wp => wp.speedObservable = this.speed$);
        super.replaceList(waypointList);
    }


    public clear() {
        super.clear();
    }



    public push(waypoint: Waypoint2) {
        if (waypoint) {
            waypoint.speedObservable = this.speed$;
            super.push(waypoint);
        }
    }


    public insert(waypoint: Waypoint2, index: number) {
        if (waypoint) {
            waypoint.speedObservable = this.speed$;
            super.insert(waypoint, index);
        }
    }


    public remove(waypoint: Waypoint2) {
        if (waypoint) {
            super.remove(waypoint);
            waypoint.speedObservable = undefined;
        }
    }


    public replace(index: number, waypoint: Waypoint2) {
        if (waypoint) {
            waypoint.speedObservable = this.speed$;
            super.replace(index, waypoint);
        }
    }


    public reverse() {
        super.reverse();
    }


    // "the ugly stuff" (set mutual next/prev waypoint for each waypoint & alternate)
    private updateDependencies(wpList: Waypoint2[], alternate: Waypoint2) {
        if (!wpList) { return; }

        let prevWp, nextWp: Waypoint2;
        wpList.forEach((wp, index) => {
            prevWp = index > 0 ? wpList[index - 1] : undefined;
            nextWp = index < wpList.length ? wpList[index] : undefined;
            if (prevWp) { prevWp.nextWaypoint = nextWp; }
            if (nextWp) { nextWp.previousWaypoint = prevWp; }
        });

        if (alternate) {
            if (wpList.length > 0) {
                const lastWp = wpList[wpList.length - 1];
                lastWp.nextWaypoint = alternate;
                alternate.previousWaypoint = lastWp;
            } else {
                alternate.previousWaypoint = undefined;
            }
            alternate.nextWaypoint = undefined;
        }
    }
}
