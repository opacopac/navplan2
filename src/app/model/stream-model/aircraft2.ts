import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


export class Aircraft2 {
    public speed$: Observable<number>;
    public consumption$: Observable<number>;
    private speedSource: BehaviorSubject<number>;
    private consumptionSource: BehaviorSubject<number>;


    constructor(
        speed = 100,
        consumption = 20) {
        this.speedSource = new BehaviorSubject<number>(speed);
        this.speed$ = this.speedSource.asObservable();
        this.consumptionSource = new BehaviorSubject<number>(consumption);
        this.consumption$ = this.consumptionSource.asObservable();
    }


    set speed(value: number) {
        this.speedSource.next(value);
    }


    set consumption(value: number) {
        this.consumptionSource.next(value);
    }
}
