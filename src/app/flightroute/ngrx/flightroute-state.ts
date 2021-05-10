import {FlightrouteListEntry} from '../domain-model/flightroute-list-entry';
import {Flightroute} from '../domain-model/flightroute';
import {ConsumptionUnit, LengthUnit, SpeedUnit, VolumeUnit} from '../../common/geo-math/domain-model/quantities/units';


export interface FlightrouteState {
    flightrouteList: FlightrouteListEntry[];
    flightroute: Flightroute;
    showShareId: string;
    distanceUnit: LengthUnit;
    altitudeUnit: LengthUnit;
    speedUnit: SpeedUnit;
    fuelUnit: VolumeUnit;
    consumptionUnit: ConsumptionUnit;
}
