import {FlightrouteListEntry} from './flightroute-list-entry';
import {Flightroute} from './flightroute';
import {ConsumptionUnit, LengthUnit, SpeedUnit, VolumeUnit} from '../../geo-math/domain/quantities/units';


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
