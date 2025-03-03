import {Observable} from 'rxjs';
import {AircraftListEntry} from '../model/aircraft-list-entry';
import {Aircraft} from '../model/aircraft';


export abstract class IAircraftService {
    public abstract readAircraftList(): Observable<AircraftListEntry[]>;

    public abstract readAircraft(aircraftId: number): Observable<Aircraft>;

    public abstract saveAircraft(aircraft: Aircraft): Observable<Aircraft>;

    public abstract duplicateAircraft(aircraftId: number): Observable<Aircraft>;

    public abstract deleteAircraft(aircraftId: number): Observable<boolean>;
}
