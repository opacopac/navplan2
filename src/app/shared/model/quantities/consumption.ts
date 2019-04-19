import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {ConsumptionUnit} from './units';
import {AbstractQuantity} from './abstract-quantity';


export class Consumption extends AbstractQuantity<Consumption, ConsumptionUnit> {
    public getValue(asUnit: ConsumptionUnit): number {
        return UnitconversionService.convertConsumption(this.value, this.unit, asUnit);
    }


    protected createInstance(value: number, unit: ConsumptionUnit): Consumption {
        return new Consumption(value, unit);
    }


    protected getDefaultUnit(): ConsumptionUnit {
        return ConsumptionUnit.L_PER_H;
    }
}
