import {Observable} from 'rxjs';
import {Traffic} from '../../model/traffic';
import {TrafficDetails} from '../../model/traffic-details';


export abstract class ITrafficDetailsService {
    abstract readDetails(trafficList: Traffic[]): Observable<TrafficDetails[]>;
}
