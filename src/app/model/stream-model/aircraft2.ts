import * as Rx from 'rxjs';


export class Aircraft2 {
    public speed$: Rx.Observable<number>;
    public consumption$: Rx.Observable<number>;
    private speedSource: Rx.BehaviorSubject<number>;
    private consumptionSource: Rx.BehaviorSubject<number>;


    constructor(
        speed = 100,
        consumption = 20) {
        this.speedSource = new Rx.BehaviorSubject<number>(speed);
        this.speed$ = this.speedSource.asObservable();
        this.consumptionSource = new Rx.BehaviorSubject<number>(consumption);
        this.consumption$ = this.consumptionSource.asObservable();
    }


    set speed(value: number) {
        this.speedSource.next(value);
    }


    set consumption(value: number) {
        this.consumptionSource.next(value);
    }
}
