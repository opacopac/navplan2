import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {SpeedUnit} from './units';
import {AbstractQuantity} from './abstract-quantity';


export class Speed extends AbstractQuantity<Speed, SpeedUnit> {
    public getValue(asUnit: SpeedUnit): number {
        return UnitconversionService.convertSpeed(this.value, this.unit, asUnit);
    }


    protected createInstance(value: number, unit: SpeedUnit): Speed {
        return new Speed(value, unit);
    }


    protected getDefaultUnit(): SpeedUnit {
        return SpeedUnit.MPS;
    }
}
