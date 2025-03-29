import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../domain/model/aircraft';
import {AircraftTypeDesignatorSearchState} from './aircraft-type-designator-search-state';
import {TableState} from '../../../common/state/model/table-state';

export interface AircraftState {
    aircraftList: AircraftListEntry[];
    currentAircraft: Aircraft;
    acTypeDesignatorSearchState: AircraftTypeDesignatorSearchState;
    aircraftTableState: TableState;
}
