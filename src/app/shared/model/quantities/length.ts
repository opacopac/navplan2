import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {LengthUnit} from './units';
import {Clonable} from '../clonable';
import {AbstractQuantity} from './abstract-quantity';


export class Length extends AbstractQuantity<Length, LengthUnit> implements Clonable<Length> {
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


    protected createInstance(value: number, unit: LengthUnit): Length {
        return new Length(value, unit);
    }


    protected getDefaultUnit(): LengthUnit {
        return LengthUnit.M;
    }
}
