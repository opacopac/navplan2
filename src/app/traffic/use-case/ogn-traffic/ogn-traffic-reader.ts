import {IOgnTrafficService} from './i-ogn-traffic-service';
import {Observable} from 'rxjs';
import {TrafficOgn} from '../../domain/traffic-ogn';
import {Extent3d} from '../../../shared/model/geometry/extent3d';


export class OgnTrafficReader {
    public constructor(
        private readonly ognTrafficService: IOgnTrafficService
    ) {
    }


    public read(extent: Extent3d, sessionId: string, maxAgeSec: number): Observable<TrafficOgn[]> {
        return this.ognTrafficService.readTraffic(
            extent,
            maxAgeSec,
            0,
            sessionId
        );
    }
}
