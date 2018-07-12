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


    get isZero(): boolean {
        return this.value === 0;
    }


    get isZeroOrNegative(): boolean {
        return this.value <= 0;
    }


    public getValue(asUnit: LengthUnit): number {
        return UnitconversionService.convertLength(this.value, this.unit, asUnit);
    }
}
