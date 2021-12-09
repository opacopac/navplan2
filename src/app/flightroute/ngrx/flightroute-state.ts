import {Flightroute} from '../domain-model/flightroute';
import {LengthUnit} from '../../common/geo-math/domain-model/quantities/length-unit';
import {SpeedUnit} from '../../common/geo-math/domain-model/quantities/speed-unit';
import {VolumeUnit} from '../../common/geo-math/domain-model/quantities/volume-unit';
import {ConsumptionUnit} from '../../common/geo-math/domain-model/quantities/consumption-unit';


export interface FlightrouteState {
    flightroute: Flightroute;
    showShareId: string;
    distanceUnit: LengthUnit;
    altitudeUnit: LengthUnit;
    speedUnit: SpeedUnit;
    fuelUnit: VolumeUnit;
    consumptionUnit: ConsumptionUnit;
}
