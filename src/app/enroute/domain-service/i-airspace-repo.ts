import {Observable} from 'rxjs';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {Airspace} from '../domain-model/airspace';


export abstract class IAirspaceRepo {
    public abstract readAirspacesByExtent(extent: Extent2d, zoom: number): Observable<Airspace[]>;
}
