import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {OgnTraffic} from '../../domain-model/ogn-traffic';


export abstract class IOgnTrafficService {
    abstract readTraffic(extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string): Observable<OgnTraffic[]>;
}
