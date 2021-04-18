import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {TrafficOpensky} from '../../domain-model/traffic-opensky';


export interface IOpenskyTrafficService {
    readTraffic(extent: Extent2d): Observable<TrafficOpensky[]>;
}
