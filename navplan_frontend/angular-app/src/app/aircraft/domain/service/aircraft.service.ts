import {Observable} from 'rxjs';
import {User} from '../../../user/domain/model/user';
import {Injectable} from '@angular/core';
import {IAircraftService} from './i-aircraft.service';
import {IAircraftRepoService} from './i-aircraft-repo.service';
import {AircraftListEntry} from '../model/aircraft-list-entry';
import {Aircraft} from '../model/aircraft';


@Injectable()
export class AircraftService implements IAircraftService {
    public constructor(private aircraftRepo: IAircraftRepoService) {
    }


    public readAircraftList(user: User): Observable<AircraftListEntry[]> {
        return this.aircraftRepo.readAircraftList(user);
    }


    public readAircraft(aircraftId: number, user: User): Observable<Aircraft> {
        return this.aircraftRepo.readAircraft(aircraftId, user);
    }


    public saveAircraft(aircraft: Aircraft, user: User): Observable<Aircraft> {
        return this.aircraftRepo.saveAircraft(aircraft, user);
    }
}
