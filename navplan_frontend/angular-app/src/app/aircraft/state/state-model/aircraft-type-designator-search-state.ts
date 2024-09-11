import {AircraftTypeDesignator} from '../../domain/model/aircraft-type-designator';


export interface AircraftTypeDesignatorSearchState {
    searchResults: AircraftTypeDesignator[];
    selectedResultIndex: number;
    selectedSearchResult: AircraftTypeDesignator;
}
