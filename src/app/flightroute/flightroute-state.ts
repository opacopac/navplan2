import {FlightrouteListEntry} from './model/flightroute-list-entry';
import {Flightroute} from './model/flightroute';
import {Waypoint} from './model/waypoint';
import {ConsumptionUnit, LengthUnit, SpeedUnit, VolumeUnit} from '../shared/model/units';


export interface FlightrouteState {
    flightrouteList: FlightrouteListEntry[];
    flightroute: Flightroute;
    editWaypoint: Waypoint;
    showShareId: string;
    distanceUnit: LengthUnit;
    altitudeUnit: LengthUnit;
    speedUnit: SpeedUnit;
    fuelUnit: VolumeUnit;
    consumptionUnit: ConsumptionUnit;
}
