import {Observable} from 'rxjs';
import {AircraftListEntry} from '../model/aircraft-list-entry';
import {User} from '../../../user/domain/model/user';
import {Aircraft} from '../model/aircraft';


export abstract class IAircraftService {
    public abstract readAircraftList(user: User): Observable<AircraftListEntry[]>;

    public abstract readAircraft(aircraftId: number, user: User): Observable<Aircraft>;

    public abstract saveAircraft(aircraft: Aircraft, user: User): Observable<Aircraft>;

    public abstract duplicateAircraft(aircraftId: number, user: User): Observable<Aircraft>;

    public abstract deleteAircraft(aircraftId: number, user: User): Observable<boolean>;
}
