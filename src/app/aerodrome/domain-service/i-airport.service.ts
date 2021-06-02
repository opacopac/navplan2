import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Airport} from '../domain-model/airport';
import {AirportState} from '../domain-model/airport-state';


export abstract class IAirportService {
    public abstract readByExtent(extent: Extent2d, zoom: number): Observable<AirportState>;

    public abstract readById(id: number): Observable<Airport>;

    public abstract readByIcao(icao: string): Observable<Airport>;
}
