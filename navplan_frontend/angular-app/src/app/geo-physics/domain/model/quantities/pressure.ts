import {Clonable} from '../../../../system/domain/model/clonable';
import {AbstractQuantity} from './abstract-quantity';
import {PressureUnit} from './pressure-unit';


export class Pressure extends AbstractQuantity<Pressure, PressureUnit> implements Clonable<Pressure> {
    private static readonly INHG_PER_HPA = 0.029529983071445;


    public static ofHpa(value: number): Pressure {
        return new Pressure(value, PressureUnit.HPA);
    }


    public static ofInHg(value: number): Pressure {
        return new Pressure(value, PressureUnit.INHG);
    }


    public static convertTemperature(
        value: number,
        unit: PressureUnit,
        convertToUnit: PressureUnit
    ): number {
        if (unit === convertToUnit) {
            return value;
        }
        if (value === undefined) {
            return undefined;
        }

        switch (unit) {
            case PressureUnit.HPA:
                switch (convertToUnit) {
                    case PressureUnit.INHG:
                        return value * Pressure.INHG_PER_HPA;
                    default:
                        return undefined;
                }

            case PressureUnit.INHG:
                switch (convertToUnit) {
                    case PressureUnit.HPA:
                        return value / Pressure.INHG_PER_HPA;
                    default:
                        return undefined;
                }

            default:
                return undefined;
        }
    }


    public get hPa(): number {
        return this.getValue(PressureUnit.HPA);
    }


    public get inHg(): number {
        return this.getValue(PressureUnit.INHG);
    }


    public getValue(asUnit: PressureUnit): number {
        return Pressure.convertTemperature(this.value, this.unit, asUnit);
    }


    public clone(): Pressure {
        return new Pressure(this.value, this.unit);
    }


    protected createInstance(value: number, unit: PressureUnit): Pressure {
        return new Pressure(value, unit);
    }


    protected getDefaultUnit(): PressureUnit {
        return PressureUnit.HPA;
    }
}
