import {Injectable} from '@angular/core';


const FT_PER_M = 3.2808;
const M_PER_NM = 1852;


@Injectable()
export class UnitconversionService {
    public static m2ft(height_m): number {
        return height_m * FT_PER_M;
    }


    public static ft2m(height_ft): number {
        return height_ft / FT_PER_M;
    }


    public static nautmile2m(distance_nm): number {
        return distance_nm * M_PER_NM;
    }


    public static kmh2kt(speed_kmh): number {
        return speed_kmh / M_PER_NM / 1000;
    }


    public static deg2rad(deg): number {
        return deg / 360 * 2 * Math.PI;
    }


    public static rad2deg(rad): number {
        return rad / (2 * Math.PI) * 360;
    }
}
