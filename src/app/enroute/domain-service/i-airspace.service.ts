import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {AirspaceState} from '../domain-model/airspace-state';


export abstract class IAirspaceService {
    public abstract readByExtent(extent: Extent2d, zoom: number): Observable<AirspaceState>;
}
