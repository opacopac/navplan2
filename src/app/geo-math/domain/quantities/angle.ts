import {AngleUnit} from './units';
import {AbstractQuantity} from './abstract-quantity';


export class Angle extends AbstractQuantity<Angle, AngleUnit> {
    public static getZero(): Angle {
        return new Angle(0, AngleUnit.DEG);
    }


    public static convert(
        value: number,
        unit: AngleUnit,
        convertToUnit: AngleUnit): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }


        switch (unit) {
            case AngleUnit.DEG:
                switch (convertToUnit) {
                    case AngleUnit.RAD: return value / 360 * 2 * Math.PI;
                    default: return undefined;
                }
            case AngleUnit.RAD:
                switch (convertToUnit) {
                    case AngleUnit.DEG: return value / (2 * Math.PI) * 360;
                    default: return undefined;
                }
            default: return undefined;
        }
    }


    public static deg2rad(deg: number): number {
        return Angle.convert(deg, AngleUnit.DEG, AngleUnit.RAD);
    }


    public get rad(): number {
        return this.getValue(AngleUnit.RAD);
    }


    public get deg(): number {
        return this.getValue(AngleUnit.DEG);
    }


    public getValue(asUnit: AngleUnit): number {
        return Angle.convert(this.value, this.unit, asUnit);
    }


    protected createInstance(value: number, unit: AngleUnit): Angle {
        return new Angle(value, unit);
    }


    protected getDefaultUnit(): AngleUnit {
        return AngleUnit.DEG;
    }
}
