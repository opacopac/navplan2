import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/combineLatest';


export class Routefuel2 {
    public readonly reserveTime$: Observable<number>;
    private readonly reserveTimeSource: BehaviorSubject<number>;
    public readonly extraTime$: Observable<number>;
    private readonly extraTimeSource: BehaviorSubject<number>;
    public readonly totalTime$: Observable<number>;
    public readonly tripFuel$: Observable<number>;
    public readonly alternateFuel$: Observable<number>;
    public readonly reserveFuel$: Observable<number>;
    public readonly extraFuel$: Observable<number>;
    public readonly totalFuel$: Observable<number>;


    constructor(
        private readonly consumption$: Observable<number>,
        private readonly tripTime$: Observable<number>,
        private readonly alternateTime$: Observable<number>,
        reserveTime = 45,
        extraTime = 0) {
        this.reserveTimeSource = new BehaviorSubject<number>(reserveTime);
        this.reserveTime$ = this.reserveTimeSource.asObservable();
        this.extraTimeSource = new BehaviorSubject<number>(extraTime);
        this.extraTime$ = this.extraTimeSource.asObservable();
        this.totalTime$ = Observable.combineLatest(
            this.tripTime$,
            this.alternateTime$,
            this.reserveTime$,
            this.extraTime$,
            (tripTime, alternateTime, reserveTime, extraTime) =>
                this.calcTotalTime(tripTime, alternateTime, reserveTime, extraTime)
        );
        this.tripFuel$ = Observable.combineLatest(
            this.tripTime$,
            this.consumption$,
            (tripTime, consumption) => this.calcFuel(tripTime, consumption)
        );
        this.alternateFuel$ = Observable.combineLatest(
            this.alternateTime$,
            this.consumption$,
            (alternateTime, consumption) => this.calcFuel(alternateTime, consumption)
        );
        this.extraFuel$ = Observable.combineLatest(
            this.extraTime$,
            this.consumption$,
            (extraTime, consumption) => this.calcFuel(extraTime, consumption)
        );
        this.totalFuel$ = Observable.combineLatest(
            this.tripFuel$,
            this.alternateFuel$,
            this.reserveFuel$,
            this.extraFuel$,
            (tripFuel, alternateFuel, reserveFuel, extraFuel) =>
                this.calcTotalFuel(tripFuel, alternateFuel, reserveFuel, extraFuel)
        )
    }


    set extraTime(value: number) {
        this.extraTimeSource.next(value);
    }


    public calcFuel(time_min, consumption_l_per_h): number {
        return Math.ceil(consumption_l_per_h / 60 * time_min);
    }


    public calcTotalTime(tripTime_min, alternateTime_min, reserveTime_min, extraTime_min): number {
        if (!tripTime_min) { return undefined; }
        let time = tripTime_min;
        if (alternateTime_min) { time += alternateTime_min; }
        if (reserveTime_min) { time += reserveTime_min; }
        if (extraTime_min) { time += extraTime_min; }
        return time;
    }


    public calcTotalFuel(tripFuel_l, alternateFuel_l, reserveFuel_l, extraFuel_l): number {
        if (!tripFuel_l) { return undefined; }
        let fuel = tripFuel_l;
        if (alternateFuel_l) { fuel += alternateFuel_l; }
        if (reserveFuel_l) { fuel += reserveFuel_l; }
        if (extraFuel_l) { fuel += extraFuel_l; }
        return fuel;
    }
}
