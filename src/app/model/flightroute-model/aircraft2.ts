import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Speed} from "app/model/units/speed";
import {Consumption} from "../units/consumption";
import {ConsumptionUnit, SpeedUnit} from "../../services/utils/unitconversion.service";


export class Aircraft2 {
    public speed$: Observable<Speed>;
    private speedSource: BehaviorSubject<Speed>;
    public consumption$: Observable<Consumption>;
    private consumptionSource: BehaviorSubject<Consumption>;


    constructor(
        speed = new Speed(100, SpeedUnit.KT),
        consumption = new Consumption(20, ConsumptionUnit.L_PER_H)) {
        this.speedSource = new BehaviorSubject<Speed>(speed);
        this.speed$ = this.speedSource.asObservable();
        this.consumptionSource = new BehaviorSubject<Consumption>(consumption);
        this.consumption$ = this.consumptionSource.asObservable();
    }


    set speed(value: Speed) {
        this.speedSource.next(value);
    }


    set consumption(value: Consumption) {
        this.consumptionSource.next(value);
    }
}
