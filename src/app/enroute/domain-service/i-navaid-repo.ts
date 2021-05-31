import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Navaid} from '../domain-model/navaid';


export abstract class INavaidRepo {
    public abstract readNavaidsByExtent(extent: Extent2d, zoom: number): Observable<Navaid[]>;
}
