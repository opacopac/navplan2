import {SpeedUnit} from './units';
import {AbstractQuantity} from './abstract-quantity';
import {Length} from './length';


export class Speed extends AbstractQuantity<Speed, SpeedUnit> {
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


    public getValue(asUnit: SpeedUnit): number {
        return Speed.convertSpeed(this.value, this.unit, asUnit);
    }


    protected createInstance(value: number, unit: SpeedUnit): Speed {
        return new Speed(value, unit);
    }


    protected getDefaultUnit(): SpeedUnit {
        return SpeedUnit.MPS;
    }
}
