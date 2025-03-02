import {Observable} from 'rxjs';
import {FlightrouteListEntry} from '../model/flightroute-list-entry';
import {User} from '../../../user/domain/model/user';
import {Flightroute} from '../model/flightroute';


export abstract class IFlightrouteService {
    public abstract readFlightrouteList(user: User): Observable<FlightrouteListEntry[]>;

    public abstract readFlightroute(flightrouteId: number, user: User): Observable<Flightroute>;

    public abstract saveFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute>;

    public abstract duplicateFlightroute(flightrouteId: number, user: User): Observable<Flightroute>;

    public abstract deleteFlightroute(flightrouteId: number, user: User): Observable<boolean>;

    public abstract createSharedFlightroute(flightroute: Flightroute): Observable<string>;

    public abstract readSharedFlightroute(shareId: string): Observable<Flightroute>;
}
