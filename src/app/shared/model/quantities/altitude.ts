import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {LengthUnit} from '../units';


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
