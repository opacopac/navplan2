import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {VolumeUnit} from './units';
import {Clonable} from '../clonable';
import {AbstractQuantity} from './abstract-quantity';


export class Volume extends AbstractQuantity<Volume, VolumeUnit> implements Clonable<Volume> {
    public getValue(asUnit: VolumeUnit): number {
        return UnitconversionService.convertVolume(this.value, this.unit, asUnit);
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
