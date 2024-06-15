import {LengthUnit} from '../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../domain/model/quantities/consumption-unit';


export interface GeoPhysicsState {
    altitudeUnit: LengthUnit;
    distanceUnit: LengthUnit;
    speedUnit: SpeedUnit;
    consumptionUnit: ConsumptionUnit;
}
