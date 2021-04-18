import {IAdsbexTrafficService} from '../domain-service/adsbex-traffic/i-adsbex-traffic-service';
import {TrafficAdsbex} from '../domain-model/traffic-adsbex';
import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


export class AdsbexTrafficTerviceMock implements IAdsbexTrafficService {
    public readTrafficArgs: { extent: Extent2d } = { extent: undefined };


    public readTrafficResult: Observable<TrafficAdsbex[]>;


    public readTraffic(extent: Extent2d): Observable<TrafficAdsbex[]> {
        this.readTrafficArgs.extent = extent;
        return this.readTrafficResult;
    }
}
