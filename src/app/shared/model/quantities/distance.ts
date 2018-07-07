import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {LengthUnit} from '../units';


export class Distance {
    constructor(
        private readonly value: number,
        private readonly unit: LengthUnit) {
    }


    get nm(): number {
        return this.getValue(LengthUnit.NM);
    }


    public getValue(asUnit: LengthUnit): number {
        return UnitconversionService.convertLength(this.value, this.unit, asUnit);
    }
}
