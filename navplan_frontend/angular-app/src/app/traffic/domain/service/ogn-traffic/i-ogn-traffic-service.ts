import {Extent2d} from '../../../../geo-physics/domain/model/geometry/extent2d';
import {Observable} from 'rxjs';
import {OgnTraffic} from '../../model/ogn-traffic';


export abstract class IOgnTrafficService {
    abstract readTraffic(extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string): Observable<OgnTraffic[]>;
}
