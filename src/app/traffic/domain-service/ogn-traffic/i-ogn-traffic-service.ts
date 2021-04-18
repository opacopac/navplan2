import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {TrafficOgn} from '../../domain-model/traffic-ogn';


export interface IOgnTrafficService {
    readTraffic(extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string): Observable<TrafficOgn[]>;
}
