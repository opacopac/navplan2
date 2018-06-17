import 'rxjs/add/observable/combineLatest';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Consumption} from '../units/consumption';
import {Time} from '../units/time';
import {Fuel} from '../units/fuel';
import {ConsumptionUnit, TimeUnit, VolumeUnit} from '../../services/utils/unitconversion.service';


export class Routefuel2 {
    private readonly reserveTimeSource: BehaviorSubject<Time>;
    private readonly extraTimeSource: BehaviorSubject<Time>;


    constructor(
        public readonly consumption$: Observable<Consumption>,
        public readonly tripTime$: Observable<Time>,
        public readonly alternateTime$: Observable<Time>,
        extraTime = new Time(0, TimeUnit.M),
        reserveTime = new Time(45, TimeUnit.M)) {

        this.reserveTimeSource = new BehaviorSubject<Time>(reserveTime);
        this.extraTimeSource = new BehaviorSubject<Time>(extraTime);
    }


    get extraTime$(): Observable<Time> {
        return this.extraTimeSource.asObservable();
    }


    set extraTime(value: Time) {
        this.extraTimeSource.next(value);
    }


    get reserveTime$(): Observable<Time> {
        return this.reserveTimeSource.asObservable();
    }


    set reserveTime(value: Time) {
        this.reserveTimeSource.next(value);
    }


    get minimumTime$(): Observable<Time> {
        return Observable.combineLatest(
            this.tripTime$,
            this.alternateTime$,
            this.reserveTime$,
            (tripTime, alternateTime, reserveTime) =>
                this.calcMinimumTime(tripTime, alternateTime, reserveTime)
        );
    }


    get blockTime$(): Observable<Time> {
        return Observable.combineLatest(
            this.tripTime$,
            this.alternateTime$,
            this.reserveTime$,
            this.extraTime$,
            (tripTime, alternateTime, reserveTime, extraTime) =>
                this.calcBlockTime(tripTime, alternateTime, reserveTime, extraTime)
        );
    }


    get tripFuel$(): Observable<Fuel> {
        return Observable.combineLatest(
            this.tripTime$,
            this.consumption$,
            (tripTime, consumption) => this.calcFuel(tripTime, consumption)
        );
    }


    get alternateFuel$(): Observable<Fuel> {
        return Observable.combineLatest(
            this.alternateTime$,
            this.consumption$,
            (alternateTime, consumption) => this.calcFuel(alternateTime, consumption)
        );
    }


    get extraFuel$(): Observable<Fuel> {
        return Observable.combineLatest(
            this.extraTime$,
            this.consumption$,
            (extraTime, consumption) => this.calcFuel(extraTime, consumption)
        );
    }


    get reserveFuel$(): Observable<Fuel> {
        return Observable.combineLatest(
            this.reserveTime$,
            this.consumption$,
            (reserveTime, consumption) => this.calcFuel(reserveTime, consumption)
        );
    }


    get minimumFuel$(): Observable<Fuel> {
        return Observable.combineLatest(
            this.tripFuel$,
            this.alternateFuel$,
            this.reserveFuel$,
            (tripFuel, alternateFuel, reserveFuel) =>
                this.calcMinimumFuel(tripFuel, alternateFuel, reserveFuel)
        );
    }


    get blockFuel$(): Observable<Fuel> {
        return Observable.combineLatest(
            this.tripFuel$,
            this.alternateFuel$,
            this.reserveFuel$,
            this.extraFuel$,
            (tripFuel, alternateFuel, reserveFuel, extraFuel) =>
                this.calcBlockFuel(tripFuel, alternateFuel, reserveFuel, extraFuel)
        );
    }


    private calcFuel(time: Time, consumption: Consumption): Fuel {
        if (!time || !consumption) { return undefined; }
        return new Fuel(
            Math.ceil(consumption.getValue(ConsumptionUnit.L_PER_H) / 60 * time.getValue(TimeUnit.M)),
            VolumeUnit.L
        );
    }


    private calcMinimumTime(tripTime: Time, alternateTime: Time, reserveTime: Time): Time {
        if (!tripTime) { return undefined; }
        let time = tripTime;
        if (alternateTime) { time = time.add(alternateTime); }
        if (reserveTime) { time = time.add(reserveTime); }
        return time;
    }


    private calcMinimumFuel(tripFuel: Fuel, alternateFuel: Fuel, reserveFuel: Fuel): Fuel {
        if (!tripFuel) { return undefined; }
        let fuel = tripFuel;
        if (alternateFuel) { fuel = fuel.add(alternateFuel); }
        if (reserveFuel) { fuel = fuel.add(reserveFuel); }
        return fuel;
    }


    private calcBlockTime(tripTime: Time, alternateTime: Time, reserveTime: Time, extraTime: Time): Time {
        if (!tripTime) { return undefined; }
        let time = tripTime;
        if (alternateTime) { time = time.add(alternateTime); }
        if (reserveTime) { time = time.add(reserveTime); }
        if (extraTime) { time = time.add(extraTime); }
        return time;
    }


    private calcBlockFuel(tripFuel: Fuel, alternateFuel: Fuel, reserveFuel: Fuel, extraFuel: Fuel): Fuel {
        if (!tripFuel) { return undefined; }
        let fuel = tripFuel;
        if (alternateFuel) { fuel = fuel.add(alternateFuel); }
        if (reserveFuel) { fuel = fuel.add(reserveFuel); }
        if (extraFuel) { fuel = fuel.add(extraFuel); }
        return fuel;
    }
}
