import {Observable} from 'rxjs';
import {Traffic} from '../../domain-model/traffic';
import {TrafficDetails} from '../../domain-model/traffic-details';


export interface ITrafficDetailsService {
    readDetails(trafficList: Traffic[]): Observable<TrafficDetails[]>;
}
