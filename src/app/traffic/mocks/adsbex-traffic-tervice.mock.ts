import {IAdsbexTrafficService} from '../domain-service/adsbex-traffic/i-adsbex-traffic-service';
import {AdsbexTraffic} from '../domain-model/adsbex-traffic';
import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


export class AdsbexTrafficTerviceMock implements IAdsbexTrafficService {
    public readTrafficArgs: { extent: Extent2d } = { extent: undefined };


    public readTrafficResult: Observable<AdsbexTraffic[]>;


    public readTraffic(extent: Extent2d): Observable<AdsbexTraffic[]> {
        this.readTrafficArgs.extent = extent;
        return this.readTrafficResult;
    }
}
