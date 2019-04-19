import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {VolumeUnit} from './units';
import {Clonable} from '../clonable';


export class Volume implements Clonable<Volume> {
    constructor(
        private readonly value: number,
        private readonly unit: VolumeUnit) {
    }


    public static addAll(...fuels: Volume[]): Volume {
        return fuels.reduce((sum, fuel) => sum.add(fuel), new Volume(0, VolumeUnit.L));
    }


    public isZero(): boolean {
        return this.value === 0;
    }


    public isZeroOrNegative(): boolean {
        return this.value <= 0;
    }


    public getValue(asUnit: VolumeUnit): number {
        return UnitconversionService.convertVolume(this.value, this.unit, asUnit);
    }


    public add(fuel: Volume): Volume {
        if (this.unit === fuel.unit) {
            return new Volume(this.value + fuel.value, fuel.unit);
        } else {
            return new Volume(this.getValue(VolumeUnit.L) + fuel.getValue(VolumeUnit.L), VolumeUnit.L);
        }
    }


    public clone(): Volume {
        return new Volume(this.value, this.unit);
    }
}
