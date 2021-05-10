import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {AdsbexTraffic} from '../../domain-model/adsbex-traffic';


export interface IAdsbexTrafficService {
    readTraffic(extent: Extent2d): Observable<AdsbexTraffic[]>;
}
