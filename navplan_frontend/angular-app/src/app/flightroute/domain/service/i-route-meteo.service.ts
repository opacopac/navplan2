import {Flightroute} from '../model/flightroute';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {RouteMetarTafSet} from '../model/route-metar-taf-set';
import {Observable} from 'rxjs';


export abstract class IRouteMeteoService {
    public abstract getRouteMetarTafs(flightroute: Flightroute, maxRadius: Length): Observable<RouteMetarTafSet>;
}
