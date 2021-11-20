import {AbstractQuantity} from './abstract-quantity';
import {AngleUnit} from './angle-unit';


export class Angle extends AbstractQuantity<Angle, AngleUnit> {
    public static createZero(): Angle {
        return new Angle(0, AngleUnit.DEG);
    }


    public static convert(
        value: number,
        unit: AngleUnit,
        convertToUnit: AngleUnit
    ): number {
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


    public static deg2rad(value: number): number {
        return Angle.convert(value, AngleUnit.DEG, AngleUnit.RAD);
    }


    public static rad2deg(value: number): number {
        return Angle.convert(value, AngleUnit.RAD, AngleUnit.DEG);
    }


    public static calcSmallDiffAngle(angle1: Angle, angle2: Angle): Angle {
        const deg1 = angle1.deg % 360;
        const deg2 = angle2.deg % 360;
        const diff = (deg2 - deg1 + 360) % 360;
        const deg = diff > 180 ? diff - 360 : diff;

        return new Angle(deg, AngleUnit.DEG);
    }


    public static calcBigDiffAngle(angle1: Angle, angle2: Angle): Angle {
        const smallAngle = this.calcSmallDiffAngle(angle1, angle2);
        const bigAngleDeg = 360 - Math.abs(smallAngle.deg);
        const bigAngleSign = smallAngle.deg < 0 ? 1 : -1;

        return new Angle(bigAngleDeg * bigAngleSign, AngleUnit.DEG);
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


    public flip(): Angle {
        return new Angle(this.deg + 180 % 360, AngleUnit.DEG);
    }


    protected createInstance(value: number, unit: AngleUnit): Angle {
        return new Angle(value, unit);
    }


    protected getDefaultUnit(): AngleUnit {
        return AngleUnit.DEG;
    }
}
