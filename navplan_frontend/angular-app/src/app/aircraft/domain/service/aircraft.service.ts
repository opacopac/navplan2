import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IAircraftService} from './i-aircraft.service';
import {IAircraftRepoService} from './i-aircraft-repo.service';
import {AircraftListEntry} from '../model/aircraft-list-entry';
import {Aircraft} from '../model/aircraft';


@Injectable()
export class AircraftService implements IAircraftService {
    public constructor(private aircraftRepo: IAircraftRepoService) {
    }


    public readAircraftList(): Observable<AircraftListEntry[]> {
        return this.aircraftRepo.readAircraftList();
    }


    public readAircraft(aircraftId: number): Observable<Aircraft> {
        return this.aircraftRepo.readAircraft(aircraftId);
    }


    public saveAircraft(aircraft: Aircraft): Observable<Aircraft> {
        return this.aircraftRepo.saveAircraft(aircraft);
    }


    public duplicateAircraft(aircraftId: number): Observable<Aircraft> {
        return this.aircraftRepo.duplicateAircraft(aircraftId);
    }


    public deleteAircraft(aircraftId: number): Observable<boolean> {
        return this.aircraftRepo.deleteAircraft(aircraftId);
    }
}
