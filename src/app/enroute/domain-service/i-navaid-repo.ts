import {Observable} from 'rxjs';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {Navaid} from '../domain-model/navaid';


export abstract class INavaidRepo {
    public abstract readNavaidsByExtent(extent: Extent2d, zoom: number): Observable<Navaid[]>;
}
