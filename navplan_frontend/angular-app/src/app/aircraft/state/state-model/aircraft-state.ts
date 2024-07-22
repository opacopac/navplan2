import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../domain/model/aircraft';

export interface AircraftState {
    aircraftList: AircraftListEntry[];
    currentAircraft: Aircraft;
}
