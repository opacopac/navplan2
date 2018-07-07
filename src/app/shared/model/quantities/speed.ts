import {UnitconversionService} from '../../services/unitconversion/unitconversion.service';
import {SpeedUnit} from '../units';


export class Speed {
    public constructor(
        private value: number,
        private unit: SpeedUnit) {
    }


    public getValue(asUnit: SpeedUnit): number {
        return UnitconversionService.convertSpeed(this.value, this.unit, asUnit);
    }


    get isNotZero(): boolean {
        return this.value !== 0;
    }
}
