import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Consumption} from "../units/consumption";
import {Time} from "../units/time";
import {Fuel} from "../units/fuel";
import {ConsumptionUnit, TimeUnit, VolumeUnit} from "../../services/utils/unitconversion.service";
import 'rxjs/add/observable/combineLatest';


export class Routefuel2 {
    public readonly reserveTime$: Observable<Time>;
    private readonly reserveTimeSource: BehaviorSubject<Time>;
    public readonly extraTime$: Observable<Time>;
    private readonly extraTimeSource: BehaviorSubject<Time>;
    public readonly totalTime$: Observable<Time>;
    public readonly tripFuel$: Observable<Fuel>;
    public readonly alternateFuel$: Observable<Fuel>;
    public readonly reserveFuel$: Observable<Fuel>;
    public readonly extraFuel$: Observable<Fuel>;
    public readonly totalFuel$: Observable<Fuel>;


    constructor(
        private readonly consumption$: Observable<Consumption>,
        private readonly tripTime$: Observable<Time>,
        private readonly alternateTime$: Observable<Time>,
        reserveTime = new Time(45, TimeUnit.M),
        extraTime = new Time(0, TimeUnit.M)) {
        this.reserveTimeSource = new BehaviorSubject<Time>(reserveTime);
        this.reserveTime$ = this.reserveTimeSource.asObservable();
        this.extraTimeSource = new BehaviorSubject<Time>(extraTime);
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


    set extraTime(value: Time) {
        this.extraTimeSource.next(value);
    }


    public calcFuel(time: Time, consumption: Consumption): Fuel {
        return new Fuel(
            Math.ceil(consumption.getValue(ConsumptionUnit.L_PER_H) / 60 * time.getValue(TimeUnit.M)),
            VolumeUnit.L
        );
    }


    public calcTotalTime(tripTime: Time, alternateTime: Time, reserveTime: Time, extraTime: Time): Time {
        if (!tripTime) { return undefined; }
        let time = tripTime;
        if (alternateTime) { time = time.add(alternateTime); }
        if (reserveTime) { time = time.add(reserveTime); }
        if (extraTime) { time = time.add(extraTime); }
        return time;
    }


    public calcTotalFuel(tripFuel: Fuel, alternateFuel: Fuel, reserveFuel: Fuel, extraFuel: Fuel): Fuel {
        if (!tripFuel) { return undefined; }
        let fuel = tripFuel;
        if (alternateFuel) { fuel = fuel.add(alternateFuel); }
        if (reserveFuel) { fuel = fuel.add(reserveFuel); }
        if (extraFuel) { fuel = fuel.add(extraFuel); }
        return fuel;
    }
}
