import {Clonable} from '../../../../system/domain/model/clonable';
import {AbstractQuantity} from './abstract-quantity';
import {LengthUnit} from './length-unit';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


export class Length extends AbstractQuantity<Length, LengthUnit> implements Clonable<Length> {
    public static readonly FT_PER_M = 3.2808;
    public static readonly M_PER_NM = 1852;
    public static readonly FT_PER_NM = Length.FT_PER_M * Length.M_PER_NM;
    public static readonly IN_PER_FT = 12;
    public static readonly unitsAndDescriptions = [
        [LengthUnit.FT, Length.getUnitString(LengthUnit.FT)],
        [LengthUnit.M, Length.getUnitString(LengthUnit.M)],
        [LengthUnit.NM, Length.getUnitString(LengthUnit.NM)],
        [LengthUnit.KM, Length.getUnitString(LengthUnit.KM)],
        [LengthUnit.IN, Length.getUnitString(LengthUnit.IN)]
    ];


    public static getUnitString(unit: LengthUnit): string {
        switch (unit) {
            case LengthUnit.FT:
                return 'ft';
            case LengthUnit.M:
                return 'm';
            case LengthUnit.NM:
                return 'NM';
            case LengthUnit.KM:
                return 'km';
            case LengthUnit.IN:
                return 'in';
        }
    }


    public static createZero(): Length {
        return new Length(0, LengthUnit.M);
    }


    public static convert(
        value: number,
        unit: LengthUnit,
        convertToUnit: LengthUnit
    ): number {
        if (unit === convertToUnit) {
            return value;
        }
        if (value === undefined) {
            return undefined;
        }

        switch (unit) {
            case LengthUnit.NM:
                switch (convertToUnit) {
                    case LengthUnit.FT:
                        return value * Length.FT_PER_NM;
                    case LengthUnit.M:
                        return value * Length.M_PER_NM;
                    case LengthUnit.KM:
                        return value * Length.M_PER_NM / 1000;
                    case LengthUnit.IN:
                        return value * Length.FT_PER_NM * Length.IN_PER_FT;
                    default:
                        return undefined;
                }
            case LengthUnit.FT:
                switch (convertToUnit) {
                    case LengthUnit.NM:
                        return value / Length.FT_PER_NM;
                    case LengthUnit.M:
                        return value / Length.FT_PER_M;
                    case LengthUnit.KM:
                        return value / Length.FT_PER_M / 1000;
                    case LengthUnit.IN:
                        return value * Length.IN_PER_FT;
                    default:
                        return undefined;
                }
            case LengthUnit.M:
                switch (convertToUnit) {
                    case LengthUnit.NM:
                        return value / Length.M_PER_NM;
                    case LengthUnit.FT:
                        return value * Length.FT_PER_M;
                    case LengthUnit.KM:
                        return value / 1000;
                    case LengthUnit.IN:
                        return value * Length.FT_PER_M * Length.IN_PER_FT;
                    default:
                        return undefined;
                }
            case LengthUnit.KM:
                switch (convertToUnit) {
                    case LengthUnit.NM:
                        return value * 1000 / Length.M_PER_NM;
                    case LengthUnit.FT:
                        return value * 1000 * Length.FT_PER_M;
                    case LengthUnit.M:
                        return value * 1000;
                    case LengthUnit.IN:
                        return value * 1000 * Length.FT_PER_M * Length.IN_PER_FT;
                    default:
                        return undefined;
                }
            case LengthUnit.IN:
                switch (convertToUnit) {
                    case LengthUnit.FT:
                        return value / Length.IN_PER_FT;
                    case LengthUnit.M:
                        return value / Length.IN_PER_FT / Length.FT_PER_M;
                    case LengthUnit.KM:
                        return value / Length.IN_PER_FT / Length.FT_PER_M / 1000;
                    case LengthUnit.NM:
                        return value / Length.IN_PER_FT / Length.FT_PER_NM;
                    default:
                        return undefined;
                }
            default:
                return undefined;
        }
    }


    public get ft(): number {
        return this.getValue(LengthUnit.FT);
    }


    public get nm(): number {
        return this.getValue(LengthUnit.NM);
    }


    public get m(): number {
        return this.getValue(LengthUnit.M);
    }


    public get km(): number {
        return this.getValue(LengthUnit.KM);
    }


    public get in(): number {
        return this.getValue(LengthUnit.IN);
    }


    public getValue(asUnit: LengthUnit): number {
        return Length.convert(this.value, this.unit, asUnit);
    }


    public getUnitString(): string {
        return Length.getUnitString(this.unit);
    }


    public getValueAndUnit(asUnit: LengthUnit, roundToDigits: number, separator = ' '): string {
        return StringnumberHelper.roundToDigits(this.getValue(asUnit), roundToDigits) + separator + this.getUnitString();
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
