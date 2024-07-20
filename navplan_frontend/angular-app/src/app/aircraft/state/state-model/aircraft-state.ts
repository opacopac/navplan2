import { Aircraft } from "../../domain/model/aircraft";
import { AircraftListEntry } from "../../domain/model/aircraft-list-entry";


export interface AircraftState {
    aircraftList: AircraftListEntry[];
    currentAircraft: Aircraft;
}
