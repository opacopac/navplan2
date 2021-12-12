import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {Length} from '../../geo-physics/domain-model/quantities/length';
import {RouteMetarTafSet} from '../domain-model/route-metar-taf-set';
import {Observable} from 'rxjs';


export abstract class IRouteMeteoService {
    public abstract getRouteMetarTafs(flightroute: Flightroute, maxRadius: Length): Observable<RouteMetarTafSet>;
}
