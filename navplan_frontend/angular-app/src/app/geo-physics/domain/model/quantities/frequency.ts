import {Clonable} from '../../../../system/domain/model/clonable';
import {AbstractQuantity} from './abstract-quantity';
import {FrequencyUnit} from './frequency-unit';


export class Frequency extends AbstractQuantity<Frequency, FrequencyUnit> implements Clonable<Frequency> {
    public static convert(
        value: number,
        unit: FrequencyUnit,
        convertToUnit: FrequencyUnit
    ): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }

        switch (unit) {
            case FrequencyUnit.KHZ:
                switch (convertToUnit) {
                    case FrequencyUnit.KHZ: return value / 1000;
                    default: return undefined;
                }
            case FrequencyUnit.MHZ:
                switch (convertToUnit) {
                    case FrequencyUnit.KHZ: return value * 1000;
                    default: return undefined;
                }
            default: return undefined;
        }
    }


    public get khz(): number {
        return this.getValue(FrequencyUnit.KHZ);
    }


    public get mhz(): number {
        return this.getValue(FrequencyUnit.MHZ);
    }


    public getValue(asUnit: FrequencyUnit): number {
        return Frequency.convert(this.value, this.unit, asUnit);
    }


    public getValueString(): string {
        switch (this.unit) {
            case FrequencyUnit.KHZ: return this.value.toFixed(0);
            case FrequencyUnit.MHZ: return this.value.toFixed(3);
        }
    }


    public getUnitString(): string {
        switch (this.unit) {
            case FrequencyUnit.KHZ: return 'kHz';
            case FrequencyUnit.MHZ: return 'MHz';
        }
    }


    public clone(): Frequency {
        return new Frequency(
            this.value,
            this.unit);
    }


    protected createInstance(value: number, unit: FrequencyUnit): Frequency {
        return new Frequency(value, unit);
    }


    protected getDefaultUnit(): FrequencyUnit {
        return FrequencyUnit.MHZ;
    }
}
