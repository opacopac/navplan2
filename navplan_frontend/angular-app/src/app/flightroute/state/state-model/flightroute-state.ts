import {Flightroute} from '../../domain/model/flightroute';
import {FlightrouteListEntry} from '../../domain/model/flightroute-list-entry';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';


export interface FlightrouteState {
    flightrouteList: FlightrouteListEntry[];
    flightroute: Flightroute;
    selectedAircraft: Aircraft;
    useAircraftSpeedValue: boolean;
    useAircraftConsumptionValue: boolean;
}
