import {Observable} from 'rxjs/internal/Observable';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {SmaMeasurement} from '../domain-model/sma-measurement';


export abstract class IMeteoSmaRepoService {
    public abstract readSmaMeasurements(extent: Extent2d): Observable<SmaMeasurement[]>;
}