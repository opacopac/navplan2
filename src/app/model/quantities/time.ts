import { TimeUnit, UnitconversionService } from '../../core/services/utils/unitconversion.service';
import {Clonable} from "../clonable";


export class Time implements Clonable<Time> {
    constructor(
        private readonly value: number,
        private readonly unit: TimeUnit) {
    }


    public static addAll(...times: Time[]): Time {
        return times.reduce((sum, time) => sum.add(time), new Time(0, TimeUnit.M));
    }


    get min(): number {
        return this.getValue(TimeUnit.M);
    }


    get isNotZero(): boolean {
        return this.value !== 0;
    }


    public clone(): Time {
        return new Time(this.value, this.unit);
    }


    public getValue(asUnit: TimeUnit): number {
        return UnitconversionService.convertTime(this.value, this.unit, asUnit);
    }


    public add(time: Time) {
        if (!time) {
            return undefined;
        } else if (this.unit === time.unit) {
            return new Time(this.value + time.value, this.unit);
        } else {
            return new Time(this.getValue(TimeUnit.S) + time.getValue(TimeUnit.S), TimeUnit.S);
        }
    }


    public getMinSec(ceilSeconds = true): [number, number] {
        const min = Math.floor(this.getValue(TimeUnit.M));
        const sec = this.getValue(TimeUnit.S) - min * 60;
        return ceilSeconds ? [min, Math.ceil(sec)] : [min, sec];
    }


    public getHourMinutesSec(ceilSeconds = true): [number, number, number] {
        const hr = Math.floor(this.getValue(TimeUnit.H));
        const min = Math.floor(this.getValue(TimeUnit.M) - hr * 60);
        const sec = this.getValue(TimeUnit.S) - min * 60;
        return ceilSeconds ? [hr, min, Math.ceil(sec)] : [hr, min, sec];
    }


    public getHourMinutes(ceilMinutes = true): [number, number] {
        const hr = Math.floor(this.getValue(TimeUnit.H));
        const min = Math.floor(this.getValue(TimeUnit.M) - hr * 60);
        return ceilMinutes ? [hr, Math.ceil(min)] : [hr, min];
    }
}
