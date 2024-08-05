import {Clonable} from '../../../../system/domain/model/clonable';
import {AbstractQuantity} from './abstract-quantity';
import {VolumeUnit} from './volume-unit';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


export class Volume extends AbstractQuantity<Volume, VolumeUnit> implements Clonable<Volume> {
    public static readonly L_PER_GAL = 3.78541;


    public static getUnitString(unit: VolumeUnit): string {
        switch (unit) {
            case VolumeUnit.L:
                return 'l';
            case VolumeUnit.GAL:
                return 'gal';
            default:
                return '';
        }
    }


    public static convertVolume(
        value: number,
        unit: VolumeUnit,
        convertToUnit: VolumeUnit): number {
        if (unit === convertToUnit) {
            return value;
        }
        if (value === undefined) {
            return undefined;
        }

        switch (unit) {
            case VolumeUnit.L:
                switch (convertToUnit) {
                    case VolumeUnit.GAL:
                        return value / Volume.L_PER_GAL;
                    default:
                        return undefined;
                }
            case VolumeUnit.GAL:
                switch (convertToUnit) {
                    case VolumeUnit.L:
                        return value * Volume.L_PER_GAL;
                    default:
                        return undefined;
                }
            default:
                return undefined;
        }
    }


    public getValue(asUnit: VolumeUnit): number {
        return Volume.convertVolume(this.value, this.unit, asUnit);
    }


    public getUnitString(): string {
        return Volume.getUnitString(this.unit);
    }


    public getValueAndUnit(asUnit: VolumeUnit, roundToDigits = 0, separator = ' '): string {
        return StringnumberHelper.roundToDigits(this.getValue(asUnit), roundToDigits) + separator + this.getUnitString();
    }


    public clone(): Volume {
        return new Volume(this.value, this.unit);
    }


    protected createInstance(value: number, unit: VolumeUnit): Volume {
        return new Volume(value, unit);
    }


    protected getDefaultUnit(): VolumeUnit {
        return VolumeUnit.L;
    }
}
