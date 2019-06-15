import {FlightrouteListEntry} from './domain/flightroute-list-entry';
import {Flightroute} from './domain/flightroute';
import {Waypoint} from './domain/waypoint';
import {ConsumptionUnit, LengthUnit, SpeedUnit, VolumeUnit} from '../shared/model/quantities/units';


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
