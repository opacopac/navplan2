import {Observable} from 'rxjs';
import {Traffic} from '../../domain-model/traffic';
import {TrafficDetails} from '../../domain-model/traffic-details';


export abstract class ITrafficDetailsService {
    abstract readDetails(trafficList: Traffic[]): Observable<TrafficDetails[]>;
}
