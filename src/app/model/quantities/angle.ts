import {UnitconversionService, AngleUnit} from '../../services/utils/unitconversion.service';


export class Angle {
    constructor(
        private readonly value: number,
        private readonly unit: AngleUnit) {
    }


    public getValue(asUnit: AngleUnit): number {
        return UnitconversionService.convertAngle(this.value, this.unit, asUnit);
    }


    public get rad(): number {
        return this.getValue(AngleUnit.RAD);
    }


    public get deg(): number {
        return this.getValue(AngleUnit.DEG);
    }
}
