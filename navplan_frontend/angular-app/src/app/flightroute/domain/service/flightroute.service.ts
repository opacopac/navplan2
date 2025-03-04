import {Observable} from 'rxjs';
import {FlightrouteListEntry} from '../model/flightroute-list-entry';
import {Flightroute} from '../model/flightroute';
import {Injectable} from '@angular/core';
import {IFlightrouteService} from './i-flightroute.service';
import {IFlightrouteRepoService} from './i-flightroute-repo.service';


@Injectable()
export class FlightrouteService implements IFlightrouteService {
    public constructor(private flightrouteRepo: IFlightrouteRepoService) {
    }

    public readFlightrouteList(): Observable<FlightrouteListEntry[]> {
        return this.flightrouteRepo.readFlightrouteList();
    }


    public readFlightroute(flightrouteId: number): Observable<Flightroute> {
        return this.flightrouteRepo.readFlightroute(flightrouteId);
    }


    public saveFlightroute(flightroute: Flightroute): Observable<Flightroute> {
        return this.flightrouteRepo.saveFlightroute(flightroute);
    }


    public duplicateFlightroute(flightrouteId: number): Observable<Flightroute> {
        return this.flightrouteRepo.duplicateFlightroute(flightrouteId);
    }


    public deleteFlightroute(flightrouteId: number): Observable<boolean> {
        return this.flightrouteRepo.deleteFlightroute(flightrouteId);
    }


    public createSharedFlightroute(flightroute: Flightroute): Observable<string> {
        return this.flightrouteRepo.createSharedFlightroute(flightroute);
    }


    public readSharedFlightroute(shareId: string): Observable<Flightroute> {
        return this.flightrouteRepo.readSharedFlightroute(shareId);
    }
}
