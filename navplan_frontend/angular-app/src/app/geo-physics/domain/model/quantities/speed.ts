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
            default: return '';
        }
    }


    public static fromKt(speedKt: number) {
        return new Speed(speedKt, SpeedUnit.KT);
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
                    default: return undefined;
                }
            case SpeedUnit.KMH:
                switch (convertToUnit) {
                    case SpeedUnit.KT: return value / (Length.M_PER_NM / 1000);
                    case SpeedUnit.MPS: return value * 3.6;
                    default: return undefined;
                }
            case SpeedUnit.MPS:
                switch (convertToUnit) {
                    case SpeedUnit.KT: return value * (3600 / Length.M_PER_NM);
                    case SpeedUnit.KMH: return value / 3.6;
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
