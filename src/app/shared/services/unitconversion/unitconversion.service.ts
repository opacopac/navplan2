import {AngleUnit, ConsumptionUnit, LengthUnit, SpeedUnit, TimeUnit, VolumeUnit} from '../../model/units';


const FT_PER_M = 3.2808;
const M_PER_NM = 1852;
const FT_PER_NM = FT_PER_M * M_PER_NM;
const L_PER_GAL = 3.785;


export class UnitconversionService {

    // region lenght

    public static m2ft(height_m: number): number {
        if (height_m === undefined) { return undefined; }
        return height_m * FT_PER_M;
    }


    public static ft2m(height_ft: number): number {
        if (height_ft === undefined) { return undefined; }
        return height_ft / FT_PER_M;
    }


    public static nautmile2m(distance_nm: number): number {
        if (distance_nm === undefined) { return undefined; }
        return distance_nm * M_PER_NM;
    }


    public static m2nautmile(distance_m: number): number {
        if (distance_m === undefined) { return undefined; }
        return distance_m / M_PER_NM;
    }


    public static convertLength(
        value: number,
        unit: LengthUnit,
        convertToUnit: LengthUnit): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }

        switch (unit) {
            case LengthUnit.NM:
                switch (convertToUnit) {
                    case LengthUnit.FT: return value * FT_PER_NM;
                    case LengthUnit.M: return value * M_PER_NM;
                    default: return undefined;
                }
            case LengthUnit.FT:
                switch (convertToUnit) {
                    case LengthUnit.NM: return value / FT_PER_NM;
                    case LengthUnit.M: return value / FT_PER_M;
                    default: return undefined;
                }
            case LengthUnit.M:
                switch (convertToUnit) {
                    case LengthUnit.NM: return value / M_PER_NM;
                    case LengthUnit.FT: return value * FT_PER_M;
                    default: return undefined;
                }
            default: return undefined;
        }
    }

    // endregion


    // region speed

    public static convertSpeed(
        value: number,
        unit: SpeedUnit,
        convertToUnit: SpeedUnit): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }


        switch (unit) {
            case SpeedUnit.KT:
                switch (convertToUnit) {
                    case SpeedUnit.KMH: return value * (M_PER_NM / 1000);
                    case SpeedUnit.MPS: return value / (3600 / M_PER_NM);
                    default: return undefined;
                }
            case SpeedUnit.KMH:
                switch (convertToUnit) {
                    case SpeedUnit.KT: return value / (M_PER_NM / 1000);
                    case SpeedUnit.MPS: return value * 3.6;
                    default: return undefined;
                }
            case SpeedUnit.MPS:
                switch (convertToUnit) {
                    case SpeedUnit.KT: return value * (3600 / M_PER_NM);
                    case SpeedUnit.KMH: return value / 3.6;
                    default: return undefined;
                }
            default: return undefined;
        }
    }

    // endregion


    // region angle

    public static deg2rad(deg: number): number {
        return this.convertAngle(deg, AngleUnit.DEG, AngleUnit.RAD);
    }


    public static rad2deg(rad: number): number {
        return this.convertAngle(rad, AngleUnit.RAD, AngleUnit.DEG);
    }

    public static convertAngle(
        value: number,
        unit: AngleUnit,
        convertToUnit: AngleUnit): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }


        switch (unit) {
            case AngleUnit.DEG:
                switch (convertToUnit) {
                    case AngleUnit.RAD: return value / 360 * 2 * Math.PI;
                    default: return undefined;
                }
            case AngleUnit.RAD:
                switch (convertToUnit) {
                    case AngleUnit.DEG: return value / (2 * Math.PI) * 360;
                    default: return undefined;
                }
            default: return undefined;
        }
    }

    // endregion


    // region volume

    public static convertVolume(
        value: number,
        unit: VolumeUnit,
        convertToUnit: VolumeUnit): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }

        switch (unit) {
            case VolumeUnit.L:
                switch (convertToUnit) {
                    case VolumeUnit.GAL: return value / L_PER_GAL;
                    default: return undefined;
                }
            case VolumeUnit.GAL:
                switch (convertToUnit) {
                    case VolumeUnit.L: return value * L_PER_GAL;
                    default: return undefined;
                }
            default: return undefined;
        }
    }

    // endregion


    // region consumption

    public static convertConsumption(
        value: number,
        unit: ConsumptionUnit,
        convertToUnit: ConsumptionUnit): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }

        switch (unit) {
            case ConsumptionUnit.L_PER_H:
                switch (convertToUnit) {
                    case ConsumptionUnit.GAL_PER_H: return value / L_PER_GAL;
                    default: return undefined;
                }
            case ConsumptionUnit.GAL_PER_H:
                switch (convertToUnit) {
                    case ConsumptionUnit.L_PER_H: return value * L_PER_GAL;
                    default: return undefined;
                }
            default: return undefined;
        }
    }

    // endregion


    // region time

    public static convertTime(
        value: number,
        unit: TimeUnit,
        convertToUnit: TimeUnit): number {
        if (unit === convertToUnit) { return value; }
        if (value === undefined) { return undefined; }


        switch (unit) {
            case TimeUnit.S:
                switch (convertToUnit) {
                    case TimeUnit.M: return value / 60;
                    case TimeUnit.H: return value / 3600;
                    default: return undefined;
                }
            case TimeUnit.M:
                switch (convertToUnit) {
                    case TimeUnit.S: return value * 60;
                    case TimeUnit.H: return value / 60;
                    default: return undefined;
                }
            case TimeUnit.H:
                switch (convertToUnit) {
                    case TimeUnit.S: return value * 3600;
                    case TimeUnit.M: return value * 60;
                    default: return undefined;
                }
            default: return undefined;
        }
    }

    // endregion
}
