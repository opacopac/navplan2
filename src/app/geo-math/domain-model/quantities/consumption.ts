import {ConsumptionUnit} from './units';
import {AbstractQuantity} from './abstract-quantity';
import {Volume} from './volume';


export class Consumption extends AbstractQuantity<Consumption, ConsumptionUnit> {
    public static convertConsumption(
        value: number,
        unit: ConsumptionUnit,
        convertToUnit: ConsumptionUnit): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }

        switch (unit) {
            case ConsumptionUnit.L_PER_H:
                switch (convertToUnit) {
                    case ConsumptionUnit.GAL_PER_H: return value / Volume.L_PER_GAL;
                    default: return undefined;
                }

            case ConsumptionUnit.GAL_PER_H:
                switch (convertToUnit) {
                    case ConsumptionUnit.L_PER_H: return value * Volume.L_PER_GAL;
                    default: return undefined;
                }

            default: return undefined;
        }
    }


    public getValue(asUnit: ConsumptionUnit): number {
        return Consumption.convertConsumption(this.value, this.unit, asUnit);
    }


    protected createInstance(value: number, unit: ConsumptionUnit): Consumption {
        return new Consumption(value, unit);
    }


    protected getDefaultUnit(): ConsumptionUnit {
        return ConsumptionUnit.L_PER_H;
    }
}
