import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../domain/model/aircraft';
import {AircraftTypeDesignatorSearchState} from './aircraft-type-designator-search-state';

export interface AircraftState {
    aircraftList: AircraftListEntry[];
    currentAircraft: Aircraft;
    acTypeDesignatorSearchState: AircraftTypeDesignatorSearchState;
}
