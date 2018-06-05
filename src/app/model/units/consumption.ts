import {ConsumptionUnit, UnitconversionService} from "../../services/utils/unitconversion.service";

export class Consumption {
    constructor(
        private readonly value: number,
        private readonly unit: ConsumptionUnit) {
    }


    public getValue(asUnit: ConsumptionUnit): number {
        return UnitconversionService.convertConsumption(this.value, this.unit, asUnit);
    }
}
