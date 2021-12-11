import {Observable} from 'rxjs';
import {VerticalMap} from '../domain-model/vertical-map';
import {Flightroute} from '../../flightroute/domain-model/flightroute';


export abstract class IVerticalMapService {
    abstract readVerticalMap(flightroute: Flightroute): Observable<VerticalMap>;
}
