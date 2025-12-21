import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Observable} from 'rxjs';
import {TimestampInterval} from '../../../geo-physics/domain/model/quantities/timestamp-interval';
import { LocationNotam } from '../model/location-notam';


export abstract class IRouteNotamService {
    public abstract getRouteNotams(flightroute: Flightroute, maxRadius: Length, interval: TimestampInterval): Observable<LocationNotam[]>;
}
