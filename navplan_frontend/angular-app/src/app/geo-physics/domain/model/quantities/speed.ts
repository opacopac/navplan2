import {AbstractQuantity} from './abstract-quantity';
import {Length} from './length';
import {SpeedUnit} from './speed-unit';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


export class Speed extends AbstractQuantity<Speed, SpeedUnit> {
    public static getUnitString(unit: SpeedUnit): string {
        switch (unit) {
            case SpeedUnit.KT: return 'kt';
            case SpeedUnit.KMH: return 'km/h';
            case SpeedUnit.MPS: return 'm/s';
            case SpeedUnit.FPM: return 'ft/min';
            default: return '';
        }
    }


    public static ofKt(speedKt: number) {
        return new Speed(speedKt, SpeedUnit.KT);
    }


    public static ofKmh(speedKmh: number) {
        return new Speed(speedKmh, SpeedUnit.KMH);
    }


    public static ofMps(speedMps: number) {
        return new Speed(speedMps, SpeedUnit.MPS);
    }


    public static ofFpm(speedFpm: number) {
        return new Speed(speedFpm, SpeedUnit.FPM);
    }


    public static ofZero() {
        return new Speed(0, SpeedUnit.KT);
    }


    public static convertSpeed(
        value: number,
        unit: SpeedUnit,
        convertToUnit: SpeedUnit): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }


        switch (unit) {
            case SpeedUnit.KT:
                switch (convertToUnit) {
                    case SpeedUnit.KMH: return value * (Length.M_PER_NM / 1000);
                    case SpeedUnit.MPS: return value / (3600 / Length.M_PER_NM);
                    case SpeedUnit.FPM: return value * (Length.FT_PER_NM / 60);
                    default: return undefined;
                }
            case SpeedUnit.KMH:
                switch (convertToUnit) {
                    case SpeedUnit.KT: return value / (Length.M_PER_NM / 1000);
                    case SpeedUnit.MPS: return value * 3.6;
                    case SpeedUnit.FPM: return value * (Length.FT_PER_M / 60);
                    default: return undefined;
                }
            case SpeedUnit.MPS:
                switch (convertToUnit) {
                    case SpeedUnit.KT: return value * (3600 / Length.M_PER_NM);
                    case SpeedUnit.KMH: return value / 3.6;
                    case SpeedUnit.FPM: return value * (Length.FT_PER_M / 60);
                    default: return undefined;
                }
            case SpeedUnit.FPM:
                switch (convertToUnit) {
                    case SpeedUnit.KT: return value / (Length.FT_PER_NM / 60);
                    case SpeedUnit.KMH: return value / (Length.FT_PER_M / 60);
                    case SpeedUnit.MPS: return value / (Length.FT_PER_M * 60);
                    default: return undefined;
                }
            default: return undefined;
        }
    }


    public get kt(): number {
        return this.getValue(SpeedUnit.KT);
    }


    public get kmh(): number {
        return this.getValue(SpeedUnit.KMH);
    }


    public get mps(): number {
        return this.getValue(SpeedUnit.MPS);
    }


    public get fpm(): number {
        return this.getValue(SpeedUnit.FPM);
    }


    public getValue(asUnit: SpeedUnit): number {
        return Speed.convertSpeed(this.value, this.unit, asUnit);
    }


    public getUnitString(): string {
        return Speed.getUnitString(this.unit);
    }


    public getValueAndUnit(asUnit: SpeedUnit, roundToDigits: number, separator = ' '): string {
        return StringnumberHelper.roundToDigits(this.getValue(asUnit), roundToDigits) + separator + Speed.getUnitString(asUnit);
    }


    public clone(): Speed {
        return new Speed(this.value, this.unit);
    }


    protected createInstance(value: number, unit: SpeedUnit): Speed {
        return new Speed(value, unit);
    }


    protected getDefaultUnit(): SpeedUnit {
        return SpeedUnit.MPS;
    }
}
