import {Observable} from 'rxjs';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {ShortAirport} from '../model/short-airport';
import {Airport} from '../model/airport';


export abstract class IAirportService {
    public abstract readAirportsByExtent(extent: Extent2d, zoom: number): Observable<ShortAirport[]>;

    public abstract readAirportById(id: number): Observable<Airport>;

    public abstract readAirportByIcao(icao: string): Observable<Airport>;
}
