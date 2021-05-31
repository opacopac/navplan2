import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {AirportCircuit} from '../domain-model/airport-circuit';


export abstract class IAirportCircuitRepo {
    public abstract readAirportCircuitsByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuit[]>;
}
