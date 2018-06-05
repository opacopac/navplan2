import {LengthUnit, UnitconversionService} from "../../services/utils/unitconversion.service";


export class Distance {
    constructor(
        private readonly value: number,
        private readonly unit: LengthUnit) {
    }


    public getValue(asUnit: LengthUnit): number {
        return UnitconversionService.convertLength(this.value, this.unit, asUnit);
    }
}
