import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Speed} from 'app/model/units/speed';
import {Consumption} from '../units/consumption';
import {ConsumptionUnit, SpeedUnit} from '../../services/utils/unitconversion.service';


export class Aircraft2 {
    private speedSource: BehaviorSubject<Speed>;
    private consumptionSource: BehaviorSubject<Consumption>;


    constructor(
        speed = new Speed(100, SpeedUnit.KT),
        consumption = new Consumption(20, ConsumptionUnit.L_PER_H)) {
        this.speedSource = new BehaviorSubject<Speed>(speed);
        this.consumptionSource = new BehaviorSubject<Consumption>(consumption);
    }


    get speed$(): Observable<Speed> {
        return this.speedSource.asObservable();
    }


    set speed(value: Speed) {
        this.speedSource.next(value);
    }


    get consumption$(): Observable<Consumption> {
        return this.consumptionSource.asObservable();
    }


    set consumption(value: Consumption) {
        this.consumptionSource.next(value);
    }
}
