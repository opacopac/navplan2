import {Observable} from 'rxjs';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {IOpenskyTrafficService} from '../use-case/opensky-traffic/i-opensky-traffic-service';
import {TrafficOpensky} from '../domain/traffic-opensky';


export class OpenskyTrafficTerviceMock implements IOpenskyTrafficService {
    public readTrafficArgs: { extent: Extent2d } = { extent: undefined };


    public readTrafficResult: Observable<TrafficOpensky[]>;


    public readTraffic(extent: Extent2d): Observable<TrafficOpensky[]> {
        this.readTrafficArgs =  { extent: extent };
        return this.readTrafficResult;
    }
}
