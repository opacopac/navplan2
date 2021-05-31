import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {AirportCircuitState} from '../domain-model/airport-circuit-state';


export abstract class IAirportCircuitService {
    public abstract readByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuitState>;

    public abstract isReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number }
    ): boolean;
}
