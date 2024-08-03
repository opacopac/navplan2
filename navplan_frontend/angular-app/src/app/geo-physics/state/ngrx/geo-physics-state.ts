import {LengthUnit} from '../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../domain/model/quantities/speed-unit';
import {VolumeUnit} from '../../domain/model/quantities/volume-unit';
import {ConsumptionUnit} from '../../domain/model/quantities/consumption-unit';
import {WeightUnit} from '../../domain/model/quantities/weight-unit';
import {TemperatureUnit} from '../../domain/model/quantities/temperature-unit';


export interface GeoPhysicsState {
    altitudeUnit: LengthUnit;
    routeDistanceUnit: LengthUnit;
    speedUnit: SpeedUnit;
    fuelUnit: VolumeUnit;
    fuelConsumptionUnit: ConsumptionUnit;
    weightUnit: WeightUnit;
    wnbLengthUnit: LengthUnit;
    performanceDistanceUnit: LengthUnit;
    temperatureUnit: TemperatureUnit;
}
