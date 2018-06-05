import {UnitconversionService, VolumeUnit} from "../../services/utils/unitconversion.service";


export class Fuel {
    constructor(
        private readonly value: number,
        private readonly unit: VolumeUnit) {
    }


    public getValue(asUnit: VolumeUnit): number {
        return UnitconversionService.convertVolume(this.value, this.unit, asUnit);
    }


    public add(fuel: Fuel) {
        if (this.unit === fuel.unit) {
            return new Fuel(this.value + fuel.value, fuel.unit);
        } else {
            return new Fuel(this.getValue(VolumeUnit.L) + fuel.getValue(VolumeUnit.L), VolumeUnit.L);
        }
    }
}
