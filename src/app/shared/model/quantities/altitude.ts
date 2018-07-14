import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {LengthUnit} from '../units';
import {Clonable} from '../clonable';


export class Altitude implements Clonable<Altitude> {
    constructor(
        private readonly value: number,
        private readonly unit: LengthUnit) {
    }


    get isZero(): boolean {
        return this.value === 0;
    }


    get isZeroOrNegative(): boolean {
        return this.value <= 0;
    }


    get ft(): number {
        return this.getValue(LengthUnit.FT);
    }


    public getValue(asUnit: LengthUnit): number {
        return UnitconversionService.convertLength(this.value, this.unit, asUnit);
    }


    public clone(): Altitude {
        return new Altitude(
            this.value,
            this.unit)
    }
}
