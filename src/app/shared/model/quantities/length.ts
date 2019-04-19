import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {LengthUnit} from './units';
import {Clonable} from '../clonable';


export class Length implements Clonable<Length> {
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


    get nm(): number {
        return this.getValue(LengthUnit.NM);
    }


    get m(): number {
        return this.getValue(LengthUnit.M);
    }


    public getValue(asUnit: LengthUnit): number {
        return UnitconversionService.convertLength(this.value, this.unit, asUnit);
    }


    public clone(): Length {
        return new Length(
            this.value,
            this.unit);
    }


    public add(length: Length): Length {
        if (!length) {
            return undefined;
        } else if (this.unit === length.unit) {
            return new Length(this.value + length.value, this.unit);
        } else {
            return new Length(this.getValue(LengthUnit.M) + length.getValue(LengthUnit.M), LengthUnit.M);
        }
    }
}
