import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {MetarTafState} from '../domain-model/metar-taf-state';
import {MetarTaf} from '../domain-model/metar-taf';


export abstract class IMetarTafService {
    public abstract readByExtent(extent: Extent2d, zoom: number): Observable<MetarTafState>;

    public abstract readByIcao(icao: string): Observable<MetarTaf>;
}
