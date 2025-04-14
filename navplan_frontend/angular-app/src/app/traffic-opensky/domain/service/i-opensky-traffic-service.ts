import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Observable} from 'rxjs';
import {OpenskyTraffic} from '../model/opensky-traffic';


export abstract class IOpenskyTrafficService {
    abstract readTraffic(extent: Extent2d): Observable<OpenskyTraffic[]>;
}
