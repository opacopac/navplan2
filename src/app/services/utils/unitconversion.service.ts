import {Injectable} from '@angular/core';

export enum LengthUnit {
    NM,
    FT,
    M
}

export enum SpeedUnit {
    KT,
    KMH,
    MPS
}

export enum AngleUnit {
    DEG,
    RAD
}


export enum VolumeUnit {
    L,
    GAL
}


export enum ConsumptionUnit {
    L_PER_H,
    GAL_PER_H
}


export enum TimeUnit {
    S,
    M,
    H
}


const FT_PER_M = 3.2808;
const M_PER_NM = 1852;
const FT_PER_NM = FT_PER_M * M_PER_NM;
const L_PER_GAL = 3.785;


@Injectable()
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

        switch([unit, convertToUnit]) {
            case [LengthUnit.NM, LengthUnit.FT]:
                return value * FT_PER_NM;
            case [LengthUnit.NM, LengthUnit.M]:
                return value * M_PER_NM;
            case [LengthUnit.FT, LengthUnit.NM]:
                return value / FT_PER_NM;
            case [LengthUnit.FT, LengthUnit.M]:
                return value / FT_PER_M;
            case [LengthUnit.M, LengthUnit.NM]:
                return value / M_PER_NM;
            case [LengthUnit.M, LengthUnit.FT]:
                return value * FT_PER_M;
            default:
                return undefined;
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

        switch([unit, convertToUnit]) {
            case [SpeedUnit.KT, SpeedUnit.KMH]:
                return value * (M_PER_NM / 1000);
            case [SpeedUnit.KT, SpeedUnit.MPS]:
                return value / (3600 / M_PER_NM);
            case [SpeedUnit.KMH, SpeedUnit.KT]:
                return value / (M_PER_NM / 1000);
            case [SpeedUnit.KMH, SpeedUnit.MPS]:
                return value * 3.6;
            case [SpeedUnit.MPS, SpeedUnit.KT]:
                return value * (3600 / M_PER_NM);
            case [SpeedUnit.MPS, SpeedUnit.KMH]:
                return value / 3.6;
            default:
                return undefined;
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

        switch([unit, convertToUnit]) {
            case [AngleUnit.DEG, AngleUnit.RAD]:
                return value / 360 * 2 * Math.PI;
            case [AngleUnit.RAD, AngleUnit.DEG]:
                return value / (2 * Math.PI) * 360;
            default:
                return undefined;
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

        switch([unit, convertToUnit]) {
            case [VolumeUnit.L, VolumeUnit.GAL]:
                return value / L_PER_GAL;
            case [VolumeUnit.GAL, VolumeUnit.L]:
                return value * L_PER_GAL;
            default:
                return undefined;
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

        switch([unit, convertToUnit]) {
            case [ConsumptionUnit.L_PER_H, ConsumptionUnit.GAL_PER_H]:
                return value / L_PER_GAL;
            case [ConsumptionUnit.GAL_PER_H, ConsumptionUnit.L_PER_H]:
                return value * L_PER_GAL;
            default:
                return undefined;
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

        switch([unit, convertToUnit]) {
            case [TimeUnit.S, TimeUnit.M]:
                return value / 60;
            case [TimeUnit.S, TimeUnit.H]:
                return value / 3600;
            case [TimeUnit.M, TimeUnit.S]:
                return value * 60;
            case [TimeUnit.M, TimeUnit.H]:
                return value / 60;
            case [TimeUnit.H, TimeUnit.S]:
                return value * 3600;
            case [TimeUnit.H, TimeUnit.M]:
                return value * 60;
            default:
                return undefined;
        }
    }

    // endregion
}
