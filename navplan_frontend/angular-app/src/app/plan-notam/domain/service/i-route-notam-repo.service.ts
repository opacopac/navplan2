import { Observable } from 'rxjs';
import { Flightroute } from '../../../flightroute/domain/model/flightroute';
import { Length } from '../../../geo-physics/domain/model/quantities/length';
import { TimestampInterval } from '../../../geo-physics/domain/model/quantities/timestamp-interval';
import { Notam } from '../../../notam/domain/model/notam';


export abstract class IRouteNotamRepoService {
        public abstract getRouteNotams(flightroute: Flightroute, maxRadius: Length, interval: TimestampInterval): Observable<Notam[]>;
}
