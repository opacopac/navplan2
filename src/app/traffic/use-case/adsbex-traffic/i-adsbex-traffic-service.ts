import {Extent2d} from '../../../geo-math/domain/geometry/extent2d';
import {Observable} from 'rxjs';
import {TrafficAdsbex} from '../../domain/traffic-adsbex';


export interface IAdsbexTrafficService {
    readTraffic(extent: Extent2d): Observable<TrafficAdsbex[]>;
}
