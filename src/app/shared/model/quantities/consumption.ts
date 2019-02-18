import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {ConsumptionUnit} from './units';


export class Consumption {
    constructor(
        private readonly value: number,
        private readonly unit: ConsumptionUnit) {
    }


    get isZero(): boolean {
        return this.value === 0;
    }


    get isZeroOrNegative(): boolean {
        return this.value <= 0;
    }


    public getValue(asUnit: ConsumptionUnit): number {
        return UnitconversionService.convertConsumption(this.value, this.unit, asUnit);
    }
}
