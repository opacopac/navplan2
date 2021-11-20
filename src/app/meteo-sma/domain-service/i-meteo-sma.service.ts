import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {SmaMeasurement} from '../domain-model/sma-measurement';


export abstract class IMeteoSmaService {
    public abstract readSmaMeasurements(extent: Extent2d): Observable<SmaMeasurement[]>;
}
