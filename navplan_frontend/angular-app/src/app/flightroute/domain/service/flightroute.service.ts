import {Observable} from 'rxjs';
import {FlightrouteListEntry} from '../model/flightroute-list-entry';
import {User} from '../../../user/domain/model/user';
import {Flightroute} from '../model/flightroute';
import {Injectable} from '@angular/core';
import {IFlightrouteService} from './i-flightroute.service';
import {IFlightrouteRepoService} from './i-flightroute-repo.service';


@Injectable()
export class FlightrouteService implements IFlightrouteService {
    public constructor(private flightrouteRepo: IFlightrouteRepoService) {
    }

    public readFlightrouteList(user: User): Observable<FlightrouteListEntry[]> {
        return this.flightrouteRepo.readFlightrouteList(user);
    }


    public readFlightroute(flightrouteId: number, user: User): Observable<Flightroute> {
        return this.flightrouteRepo.readFlightroute(flightrouteId, user);
    }


    public saveFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        return this.flightrouteRepo.saveFlightroute(flightroute, user);
    }


    public duplicateFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        return this.flightrouteRepo.duplicateFlightroute(flightroute, user);
    }


    public deleteFlightroute(flightrouteId: number, user: User): Observable<boolean> {
        return this.flightrouteRepo.deleteFlightroute(flightrouteId, user);
    }


    public createSharedFlightroute(flightroute: Flightroute): Observable<string> {
        return this.flightrouteRepo.createSharedFlightroute(flightroute);
    }


    public readSharedFlightroute(shareId: string): Observable<Flightroute> {
        return this.flightrouteRepo.readSharedFlightroute(shareId);
    }
}
