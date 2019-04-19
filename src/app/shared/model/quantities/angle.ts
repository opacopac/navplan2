import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {AngleUnit} from './units';


export class Angle {
    constructor(
        private readonly value: number,
        private readonly unit: AngleUnit) {
    }


    public static getZero(): Angle {
        return new Angle(0, AngleUnit.DEG);
    }


    get isZero(): boolean {
        return this.value === 0;
    }


    get isZeroOrNegative(): boolean {
        return this.value <= 0;
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
}
