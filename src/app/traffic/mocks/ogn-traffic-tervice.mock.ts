import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {IOgnTrafficService} from '../domain-service/ogn-traffic/i-ogn-traffic-service';
import {TrafficOgn} from '../domain-model/traffic-ogn';


export class OgnTrafficTerviceMock implements IOgnTrafficService {
    public readTrafficArgs: {
        extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string } = {
            extent: undefined, maxAgeSec: undefined, waitForDataSec: undefined, sessionId: undefined
        };


    public readTrafficResult: Observable<TrafficOgn[]>;


    public readTraffic(extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string): Observable<TrafficOgn[]> {
        this.readTrafficArgs =  { extent: extent, maxAgeSec: maxAgeSec, waitForDataSec: waitForDataSec, sessionId: sessionId };
        return this.readTrafficResult;
    }
}
