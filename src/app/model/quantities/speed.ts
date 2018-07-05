import {SpeedUnit, UnitconversionService} from '../../core/services/utils/unitconversion.service';


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
