import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ShortAirport} from '../domain-model/short-airport';
import {Airport} from '../domain-model/airport';
import {AirportState} from '../domain-model/airport-state';


export abstract class IAirportService {
    public abstract readByExtent(extent: Extent2d, zoom: number): Observable<AirportState>;

    public abstract readAirportById(id: number): Observable<Airport>;

    public abstract isReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number }
    ): boolean;

    public abstract findAirportInState(icao: string, airportState: AirportState): ShortAirport;
}
