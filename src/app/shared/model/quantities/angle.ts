import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {AngleUnit} from './units';
import {AbstractQuantity} from './abstract-quantity';


export class Angle extends AbstractQuantity<Angle, AngleUnit> {
    public static getZero(): Angle {
        return new Angle(0, AngleUnit.DEG);
    }


    public get rad(): number {
        return this.getValue(AngleUnit.RAD);
    }


    public get deg(): number {
        return this.getValue(AngleUnit.DEG);
    }


    public getValue(asUnit: AngleUnit): number {
        return UnitconversionService.convertAngle(this.value, this.unit, asUnit);
    }


    protected createInstance(value: number, unit: AngleUnit): Angle {
        return new Angle(value, unit);
    }


    protected getDefaultUnit(): AngleUnit {
        return AngleUnit.DEG;
    }
}
