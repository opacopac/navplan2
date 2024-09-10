import {Observable} from 'rxjs';
import {AircraftTypeDesignator} from '../model/aircraft-type-designator';


export abstract class IAircraftTypeDesignatorService {
    public abstract searchTypeDesignatorByText(searchText: string): Observable<AircraftTypeDesignator[]>;
}
