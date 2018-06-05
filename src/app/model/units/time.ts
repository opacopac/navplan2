import {TimeUnit, UnitconversionService} from "../../services/utils/unitconversion.service";


export class Time {
    constructor(
        private readonly value: number,
        private readonly unit: TimeUnit) {
    }


    public getValue(asUnit: TimeUnit): number {
        return UnitconversionService.convertTime(this.value, this.unit, asUnit);
    }


    public add(time: Time) {
        if (this.unit === time.unit) {
            return new Time(this.value + time.value, this.unit);
        } else {
            return new Time(this.getValue(TimeUnit.S) + time.getValue(TimeUnit.S), TimeUnit.S);
        }
    }


    public getMinSec(roundSeconds = true): [number, number] {
        const min = Math.floor(this.getValue(TimeUnit.M));
        const sec = this.getValue(TimeUnit.S) - min * 60;
        return roundSeconds ? [min, Math.round(sec)] : [min, sec];
    }


    public getHourMinutesSec(roundSeconds = true): [number, number, number] {
        const hr = Math.floor(this.getValue(TimeUnit.H));
        const min = Math.floor(this.getValue(TimeUnit.M) - hr * 60);
        const sec = this.getValue(TimeUnit.S) - min * 60;
        return roundSeconds ? [hr, min, Math.round(sec)] : [hr, min, sec];
    }
}
