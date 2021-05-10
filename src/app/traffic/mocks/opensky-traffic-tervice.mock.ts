import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {IOpenskyTrafficService} from '../domain-service/opensky-traffic/i-opensky-traffic-service';
import {OpenskyTraffic} from '../domain-model/opensky-traffic';


export class OpenskyTrafficTerviceMock implements IOpenskyTrafficService {
    public readTrafficArgs: { extent: Extent2d } = { extent: undefined };


    public readTrafficResult: Observable<OpenskyTraffic[]>;


    public readTraffic(extent: Extent2d): Observable<OpenskyTraffic[]> {
        this.readTrafficArgs =  { extent: extent };
        return this.readTrafficResult;
    }
}
