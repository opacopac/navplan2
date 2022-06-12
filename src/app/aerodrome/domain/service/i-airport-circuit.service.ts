import {Observable} from 'rxjs';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {AirportCircuit} from '../model/airport-circuit';


export abstract class IAirportCircuitService {
    public abstract readAirportCircuitsByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuit[]>;
}
