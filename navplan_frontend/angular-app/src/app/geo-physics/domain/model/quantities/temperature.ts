import {Clonable} from '../../../../system/domain/model/clonable';
import {AbstractQuantity} from './abstract-quantity';
import {TemperatureUnit} from './temperature-unit';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


export class Temperature extends AbstractQuantity<Temperature, TemperatureUnit> implements Clonable<Temperature> {


    public static getUnitString(unit: TemperatureUnit): string {
        switch (unit) {
            case TemperatureUnit.C:
                return '°C';
            case TemperatureUnit.F:
                return '°F';
            case TemperatureUnit.K:
                return 'K';
            default:
                return '';
        }
    }


    public static ofC(value: number): Temperature {
        return new Temperature(value, TemperatureUnit.C);
    }


    public static ofF(value: number): Temperature {
        return new Temperature(value, TemperatureUnit.F);
    }


    public static ofK(value: number): Temperature {
        return new Temperature(value, TemperatureUnit.K);
    }


    public static ofZero(): Temperature {
        return new Temperature(0, TemperatureUnit.C);
    }


    public static convertTemperature(
        value: number,
        unit: TemperatureUnit,
        convertToUnit: TemperatureUnit
    ): number {
        if (unit === convertToUnit) {
            return value;
        }
        if (value === undefined) {
            return undefined;
        }

        switch (unit) {
            case TemperatureUnit.C:
                switch (convertToUnit) {
                    case TemperatureUnit.K:
                        return value + 273.15;
                    case TemperatureUnit.F:
                        return value * 9 / 5 + 32;
                    default:
                        return undefined;
                }

            case TemperatureUnit.K:
                switch (convertToUnit) {
                    case TemperatureUnit.C:
                        return value - 273.15;
                    case TemperatureUnit.F:
                        return (value - 273.15) * 9 / 5 + 32;
                    default:
                        return undefined;
                }

            case TemperatureUnit.F:
                switch (convertToUnit) {
                    case TemperatureUnit.C:
                        return (value - 32) * 5 / 9;
                    case TemperatureUnit.K:
                        return (value - 32) * 5 / 9 + 273.15;
                    default:
                        return undefined;
                }

            default:
                return undefined;
        }
    }


    public getValue(asUnit: TemperatureUnit): number {
        return Temperature.convertTemperature(this.value, this.unit, asUnit);
    }


    public getUnitString(): string {
        return Temperature.getUnitString(this.unit);
    }


    public getValueAndUnit(asUnit: TemperatureUnit, roundToDigits: number, separator = ' '): string {
        return StringnumberHelper.roundToDigits(this.getValue(asUnit), roundToDigits) + separator + Temperature.getUnitString(asUnit);
    }


    public get c(): number {
        return this.getValue(TemperatureUnit.C);
    }


    public get k(): number {
        return this.getValue(TemperatureUnit.K);
    }


    public get f(): number {
        return this.getValue(TemperatureUnit.F);
    }


    public clone(): Temperature {
        return new Temperature(this.value, this.unit);
    }


    protected createInstance(value: number, unit: TemperatureUnit): Temperature {
        return new Temperature(value, unit);
    }


    protected getDefaultUnit(): TemperatureUnit {
        return TemperatureUnit.C;
    }
}
