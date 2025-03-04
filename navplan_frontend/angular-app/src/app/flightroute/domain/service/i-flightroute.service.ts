import {Observable} from 'rxjs';
import {FlightrouteListEntry} from '../model/flightroute-list-entry';
import {Flightroute} from '../model/flightroute';


export abstract class IFlightrouteService {
    public abstract readFlightrouteList(): Observable<FlightrouteListEntry[]>;

    public abstract readFlightroute(flightrouteId: number): Observable<Flightroute>;

    public abstract saveFlightroute(flightroute: Flightroute): Observable<Flightroute>;

    public abstract duplicateFlightroute(flightrouteId: number): Observable<Flightroute>;

    public abstract deleteFlightroute(flightrouteId: number): Observable<boolean>;

    public abstract createSharedFlightroute(flightroute: Flightroute): Observable<string>;

    public abstract readSharedFlightroute(shareId: string): Observable<Flightroute>;
}
