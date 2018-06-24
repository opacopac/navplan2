import {LengthUnit, UnitconversionService} from '../../services/utils/unitconversion.service';


export class Altitude {
    constructor(
        private readonly value: number,
        private readonly unit: LengthUnit) {
    }


    get ft(): number {
        return this.getValue(LengthUnit.FT);
    }


    public getValue(asUnit: LengthUnit): number {
        return UnitconversionService.convertLength(this.value, this.unit, asUnit);
    }
}
