import {Observable} from 'rxjs/internal/Observable';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {MetarTaf} from '../domain-model/metar-taf';


export abstract class IMetarTafRepo {
    public abstract load(extent: Extent2d): Observable<MetarTaf[]>;
}
