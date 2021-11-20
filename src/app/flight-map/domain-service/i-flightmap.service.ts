import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {AirportState} from '../../aerodrome/domain-model/airport-state';


export abstract class IFlightmapService {
    public abstract readByExtent(extent: Extent2d, zoom: number): Observable<AirportState>;
}
