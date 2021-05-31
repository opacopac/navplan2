import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {NavaidState} from '../domain-model/navaid-state';


export abstract class INavaidService {
    public abstract readByExtent(extent: Extent2d, zoom: number): Observable<NavaidState>;
}
