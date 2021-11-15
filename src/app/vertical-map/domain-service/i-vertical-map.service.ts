import {Observable} from 'rxjs';
import {VerticalMap} from '../domain-model/vertical-map';
import {Flightroute} from '../../flightroute/domain-model/flightroute';


export interface IVerticalMapService {
    readVerticalMap(flightroute: Flightroute): Observable<VerticalMap>
}
