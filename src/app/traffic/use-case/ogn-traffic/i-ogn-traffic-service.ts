import {Extent2d} from '../../../geo-math/domain/geometry/extent2d';
import {Observable} from 'rxjs';
import {TrafficOgn} from '../../domain/traffic-ogn';


export interface IOgnTrafficService {
    readTraffic(extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string): Observable<TrafficOgn[]>;
}
