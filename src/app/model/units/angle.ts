import {UnitconversionService, AngleUnit} from "../../services/utils/unitconversion.service";

export class Angle {
    constructor(
        private readonly value: number,
        private readonly unit: AngleUnit) {
    }


    public getValue(asUnit: AngleUnit): number {
        return UnitconversionService.convertAngle(this.value, this.unit, asUnit);
    }
}
