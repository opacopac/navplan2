import {Extent2d} from '../../../geo-math/domain/geometry/extent2d';
import {Observable} from 'rxjs';
import {TrafficOpensky} from '../../domain/traffic-opensky';


export interface IOpenskyTrafficService {
    readTraffic(extent: Extent2d): Observable<TrafficOpensky[]>;
}
