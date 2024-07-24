import {AbstractQuantity} from './abstract-quantity';
import {WeightUnit} from './weight-unit';


export class Weight extends AbstractQuantity<Weight, WeightUnit> {
    public static readonly LBS_PER_KG = 2.20462;

    public static readonly unitsAndDescriptions = [
        [WeightUnit.KG, Weight.getUnitString(WeightUnit.KG)],
        [WeightUnit.LBS, Weight.getUnitString(WeightUnit.LBS)],
    ];


    public static getUnitString(unit: WeightUnit): string {
        switch (unit) {
            case WeightUnit.KG:
                return 'kg';
            case WeightUnit.LBS:
                return 'lbs';
            default:
                return '';
        }
    }


    public static convertWeight(
        value: number,
        unit: WeightUnit,
        convertToUnit: WeightUnit
    ): number {
        if (unit === convertToUnit) {
            return value;
        }
        if (value === undefined) {
            return undefined;
        }


        switch (unit) {
            case WeightUnit.KG:
                switch (convertToUnit) {
                    case WeightUnit.LBS:
                        return value * Weight.LBS_PER_KG;
                    default:
                        return undefined;
                }
            case WeightUnit.LBS:
                switch (convertToUnit) {
                    case WeightUnit.KG:
                        return value / Weight.LBS_PER_KG;
                    default:
                        return undefined;
                }
            default:
                return undefined;
        }
    }


    public get kg(): number {
        return this.getValue(WeightUnit.KG);
    }


    public get lbs(): number {
        return this.getValue(WeightUnit.LBS);
    }


    public getValue(asUnit: WeightUnit): number {
        return Weight.convertWeight(this.value, this.unit, asUnit);
    }


    protected createInstance(value: number, unit: WeightUnit): Weight {
        return new Weight(value, unit);
    }


    protected getDefaultUnit(): WeightUnit {
        return WeightUnit.KG;
    }
}
