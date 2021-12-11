import {Extent2d} from '../../../geo-physics/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {AdsbexTraffic} from '../../domain-model/adsbex-traffic';


export abstract  class IAdsbexTrafficService {
    abstract readTraffic(extent: Extent2d): Observable<AdsbexTraffic[]>;
}
