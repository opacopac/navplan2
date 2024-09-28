import {AbstractQuantity} from './abstract-quantity';
import {WeightUnit} from './weight-unit';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


export class Weight extends AbstractQuantity<Weight, WeightUnit> {
    public static readonly LBS_PER_KG = 2.20462;


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


    public static ofKg(weightKg: number): Weight {
        return new Weight(weightKg, WeightUnit.KG);
    }


    public static ofLbs(weightLbs: number): Weight {
        return new Weight(weightLbs, WeightUnit.LBS);
    }


    public static ofZero(): Weight {
        return new Weight(0, WeightUnit.KG);
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


    public getUnitString(): string {
        return Weight.getUnitString(this.unit);
    }


    public getValueAndUnit(asUnit: WeightUnit, roundToDigits = 0, separator = ' '): string {
        return StringnumberHelper.roundToDigits(this.getValue(asUnit), roundToDigits) + separator + this.getUnitString();
    }


    public clone(): Weight {
        return new Weight(this.value, this.unit);
    }


    protected createInstance(value: number, unit: WeightUnit): Weight {
        return new Weight(value, unit);
    }


    protected getDefaultUnit(): WeightUnit {
        return WeightUnit.KG;
    }
}
