import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ShortAirport} from '../domain-model/short-airport';
import {Airport} from '../domain-model/airport';


export abstract class IAirportRepo {
    public abstract readAirportsByExtent(extent: Extent2d, zoom: number): Observable<ShortAirport[]>;

    public abstract readAirportById(id: number): Observable<Airport>;

    public abstract readAirportByIcao(icao: string): Observable<Airport>;
}
