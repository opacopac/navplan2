import {LengthUnit} from '../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../domain/model/quantities/speed-unit';
import {VolumeUnit} from '../../domain/model/quantities/volume-unit';
import {ConsumptionUnit} from '../../domain/model/quantities/consumption-unit';
import {WeightUnit} from '../../domain/model/quantities/weight-unit';
import {TemperatureUnit} from '../../domain/model/quantities/temperature-unit';
import {PressureUnit} from '../../domain/model/quantities/pressure-unit';


export interface GeoPhysicsState {
    altitudeUnit: LengthUnit;
    routeDistanceUnit: LengthUnit;
    horizontalSpeedUnit: SpeedUnit;
    verticalSpeedUnit: SpeedUnit;
    volumeUnit: VolumeUnit;
    fuelConsumptionUnit: ConsumptionUnit;
    weightUnit: WeightUnit;
    wnbLengthUnit: LengthUnit;
    performanceDistanceUnit: LengthUnit;
    temperatureUnit: TemperatureUnit;
    pressureUnit: PressureUnit;
}
