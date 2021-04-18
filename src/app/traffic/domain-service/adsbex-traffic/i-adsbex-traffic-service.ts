import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {TrafficAdsbex} from '../../domain-model/traffic-adsbex';


export interface IAdsbexTrafficService {
    readTraffic(extent: Extent2d): Observable<TrafficAdsbex[]>;
}
