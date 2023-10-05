import {Clonable} from '../../../../system/domain/model/clonable';
import {AbstractQuantity} from './abstract-quantity';
import {PrecipitationUnit} from './precipitation-unit';


export class Precipitation extends AbstractQuantity<Precipitation, PrecipitationUnit> implements Clonable<Precipitation> {
    public static readonly MM_PER_INCH = 25.4;


    public static convertPrecipitation(
        value: number,
        unit: PrecipitationUnit,
        convertToUnit: PrecipitationUnit
    ): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }

        switch (unit) {
            case PrecipitationUnit.MM:
                switch (convertToUnit) {
                    case PrecipitationUnit.IN: return value / Precipitation.MM_PER_INCH;
                    default: return undefined;
                }

            case PrecipitationUnit.IN:
                switch (convertToUnit) {
                    case PrecipitationUnit.MM: return value * Precipitation.MM_PER_INCH;
                    default: return undefined;
                }

            default: return undefined;
        }
    }


    public getValue(asUnit: PrecipitationUnit): number {
        return Precipitation.convertPrecipitation(this.value, this.unit, asUnit);
    }


    public get mm(): number {
        return this.getValue(PrecipitationUnit.MM);
    }


    public get in(): number {
        return this.getValue(PrecipitationUnit.IN);
    }


    public clone(): Precipitation {
        return new Precipitation(this.value, this.unit);
    }


    protected createInstance(value: number, unit: PrecipitationUnit): Precipitation {
        return new Precipitation(value, unit);
    }


    protected getDefaultUnit(): PrecipitationUnit {
        return PrecipitationUnit.MM;
    }
}
