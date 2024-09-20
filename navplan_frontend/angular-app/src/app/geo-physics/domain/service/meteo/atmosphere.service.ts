import {Length} from '../../model/quantities/length';
import {Pressure} from '../../model/quantities/pressure';
import {LengthUnit} from '../../model/quantities/length-unit';
import {PressureUnit} from '../../model/quantities/pressure-unit';
import {Temperature} from '../../model/quantities/temperature';
import {TemperatureUnit} from '../../model/quantities/temperature-unit';


export class AtmosphereService {
    private static readonly STD_ATM_PRESSURE_HPA = 1013.25;
    private static readonly STD_ATM_TEMP_C = 15;
    private static readonly PRESSURE_GRADIENT_FT_PER_HPA = 30;


    public static getStandardPressure(): Pressure {
        return new Pressure(AtmosphereService.STD_ATM_PRESSURE_HPA, PressureUnit.HPA);
    }


    public static getStandardTemperature(): Temperature {
        return new Temperature(AtmosphereService.STD_ATM_TEMP_C, TemperatureUnit.C);
    }


    public static calcPressureAltitude(
        elevation: Length,
        qnh: Pressure,
    ): Length {
        return new Length(
            elevation.ft - (qnh.hPa - this.STD_ATM_PRESSURE_HPA) * this.PRESSURE_GRADIENT_FT_PER_HPA,
            LengthUnit.FT
        );
    }


    public static calcIsaTemperature(pressureAltitude: Length, oat: Temperature): Temperature {
        return new Temperature(
            this.STD_ATM_TEMP_C - 2 * pressureAltitude.ft / 1000,
            TemperatureUnit.C
        );
    }
}
