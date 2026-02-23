import {LengthUnit} from './quantities/length-unit';
import {SpeedUnit} from './quantities/speed-unit';
import {VolumeUnit} from './quantities/volume-unit';
import {WeightUnit} from './quantities/weight-unit';
import {TemperatureUnit} from './quantities/temperature-unit';


export class NavplanUnits {
    public static readonly altitudeUnits: LengthUnit[] = [LengthUnit.FT, LengthUnit.M];
    public static readonly routeDistanceUnits: LengthUnit[] = [LengthUnit.NM, LengthUnit.KM];
    public static readonly horizontalSpeedUnits: SpeedUnit[] = [SpeedUnit.KT, SpeedUnit.KMH];
    public static readonly verticalSpeedUnits: SpeedUnit[] = [SpeedUnit.FPM, SpeedUnit.MPS];
    public static readonly fuelUnits: VolumeUnit[] = [VolumeUnit.L, VolumeUnit.GAL];
    public static readonly weightUnits: WeightUnit[] = [WeightUnit.KG, WeightUnit.LBS];
    public static readonly wnbLengthUnits: LengthUnit[] = [LengthUnit.M, LengthUnit.IN, LengthUnit.FT];
    public static readonly performanceDistanceUnits: LengthUnit[] = [LengthUnit.M, LengthUnit.FT];
    public static readonly temperatureUnits: TemperatureUnit[] = [TemperatureUnit.C, TemperatureUnit.F];
}


