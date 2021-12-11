import {Observable} from 'rxjs/internal/Observable';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {MetarTaf} from '../domain-model/metar-taf';


export abstract class IMetarTafService {
    public abstract load(extent: Extent2d): Observable<MetarTaf[]>;
}
