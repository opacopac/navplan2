import {Length} from '../../model/quantities/length';
import {Pressure} from '../../model/quantities/pressure';
import {LengthUnit} from '../../model/quantities/length-unit';
import {Temperature} from '../../model/quantities/temperature';
import {TemperatureUnit} from '../../model/quantities/temperature-unit';


export class AtmosphereService {
    private static readonly STD_ATM_PRESSURE_SEA_LEVEL_HPA = 1013.25;
    private static readonly STD_ATM_TEMP_SEA_LEVEL_C = 15;
    private static readonly TEMP_GRADIENT_K_PER_M = 0.0065;
    private static readonly TEMP_GRADIENT_C_PER_FT = this.TEMP_GRADIENT_K_PER_M / Length.FT_PER_M;
    private static readonly PRESSURE_GRADIENT_FT_PER_HPA = 30;


    public static getStandardPressureAtSeaLevel(): Pressure {
        return Pressure.ofHpa(AtmosphereService.STD_ATM_PRESSURE_SEA_LEVEL_HPA);
    }


    public static getStandardTemperatureAtSeaLevel(): Temperature {
        return Temperature.ofC(AtmosphereService.STD_ATM_TEMP_SEA_LEVEL_C);
    }


    public static calcPressureAltitude(
        elevation: Length,
        qnh: Pressure,
    ): Length {
        return new Length(
            elevation.ft - (qnh.hPa - this.STD_ATM_PRESSURE_SEA_LEVEL_HPA) * this.PRESSURE_GRADIENT_FT_PER_HPA,
            LengthUnit.FT
        );
    }


    public static calcStandardTemperatureAtAltitude(altitude: Length): Temperature {
        return new Temperature(
            this.STD_ATM_TEMP_SEA_LEVEL_C - this.TEMP_GRADIENT_C_PER_FT * altitude.ft,
            TemperatureUnit.C
        );
    }


    public static calcIsaTemperatureDelta(altitude: Length, oat: Temperature): Temperature {
        const isaTemp = this.calcStandardTemperatureAtAltitude(altitude);
        return new Temperature(
            oat.c - isaTemp.c,
            TemperatureUnit.C
        );
    }
}
