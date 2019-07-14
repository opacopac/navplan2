import {IAdsbexTrafficService} from '../use-case/adsbex-traffic/i-adsbex-traffic-service';
import {TrafficAdsbex} from '../domain/traffic-adsbex';
import {Observable} from 'rxjs';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';


export class AdsbexTrafficTerviceMock implements IAdsbexTrafficService {
    public readTrafficArgs: { extent: Extent2d } = { extent: undefined };


    public readTrafficResult: Observable<TrafficAdsbex[]>;


    public readTraffic(extent: Extent2d): Observable<TrafficAdsbex[]> {
        this.readTrafficArgs.extent = extent;
        return this.readTrafficResult;
    }
}
