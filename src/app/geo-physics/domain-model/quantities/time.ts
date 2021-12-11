import {TimeUnit} from './time-unit';
import {Clonable} from '../../../system/domain-model/clonable';
import {AbstractQuantity} from './abstract-quantity';


export class Time extends AbstractQuantity<Time, TimeUnit> implements Clonable<Time> {
    public static convertTime(
        value: number,
        unit: TimeUnit,
        convertToUnit: TimeUnit): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }

        switch (unit) {
            case TimeUnit.MS:
                switch (convertToUnit) {
                    case TimeUnit.S: return value / 1000;
                    case TimeUnit.M: return value / 1000 / 60;
                    case TimeUnit.H: return value / 1000 / 60 / 60;
                    default: return undefined;
                }

            case TimeUnit.S:
                switch (convertToUnit) {
                    case TimeUnit.MS: return value * 1000;
                    case TimeUnit.M: return value / 60;
                    case TimeUnit.H: return value / 60 / 60;
                    default: return undefined;
                }

            case TimeUnit.M:
                switch (convertToUnit) {
                    case TimeUnit.MS: return value * 60 * 1000;
                    case TimeUnit.S: return value * 60;
                    case TimeUnit.H: return value / 60;
                    default: return undefined;
                }

            case TimeUnit.H:
                switch (convertToUnit) {
                    case TimeUnit.MS: return value * 60 * 60 * 1000;
                    case TimeUnit.S: return value * 60 * 60;
                    case TimeUnit.M: return value * 60;
                    default: return undefined;
                }

            default: return undefined;
        }
    }


    public get min(): number {
        return this.getValue(TimeUnit.M);
    }


    public clone(): Time {
        return new Time(this.value, this.unit);
    }


    public getValue(asUnit: TimeUnit): number {
        return Time.convertTime(this.value, this.unit, asUnit);
    }


    public getHourMinutes(ceilMinutes = true): [number, number] {
        const hr = Math.floor(this.getValue(TimeUnit.H));
        const min = this.getValue(TimeUnit.M) - hr * 60;
        return ceilMinutes ? [hr, Math.ceil(min)] : [hr, min];
    }


    public getMinSec(ceilSeconds = true): [number, number] {
        const min = Math.floor(this.getValue(TimeUnit.M));
        const sec = this.getValue(TimeUnit.S) - min * 60;
        return ceilSeconds ? [min, Math.ceil(sec)] : [min, sec];
    }


    public getHourMinutesSec(ceilSeconds = true): [number, number, number] {
        const hr = Math.floor(this.getValue(TimeUnit.H));
        const min = Math.floor(this.getValue(TimeUnit.M) - hr * 60);
        const sec = this.getValue(TimeUnit.S) - hr * 60 * 60 - min * 60;
        return ceilSeconds ? [hr, min, Math.ceil(sec)] : [hr, min, sec];
    }


    protected createInstance(value: number, unit: TimeUnit): Time {
        return new Time(value, unit);
    }


    protected getDefaultUnit(): TimeUnit {
        return TimeUnit.S;
    }
}
