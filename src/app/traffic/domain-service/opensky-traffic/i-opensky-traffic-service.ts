import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {OpenskyTraffic} from '../../domain-model/opensky-traffic';


export interface IOpenskyTrafficService {
    readTraffic(extent: Extent2d): Observable<OpenskyTraffic[]>;
}
