import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {IOgnTrafficService} from '../domain-service/ogn-traffic/i-ogn-traffic-service';
import {OgnTraffic} from '../domain-model/ogn-traffic';


export class OgnTrafficTerviceMock implements IOgnTrafficService {
    public readTrafficArgs: {
        extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string } = {
            extent: undefined, maxAgeSec: undefined, waitForDataSec: undefined, sessionId: undefined
        };


    public readTrafficResult: Observable<OgnTraffic[]>;


    public readTraffic(extent: Extent2d, maxAgeSec: number, waitForDataSec: number, sessionId: string): Observable<OgnTraffic[]> {
        this.readTrafficArgs =  { extent: extent, maxAgeSec: maxAgeSec, waitForDataSec: waitForDataSec, sessionId: sessionId };
        return this.readTrafficResult;
    }
}
