import {Observable} from 'rxjs';
import {Traffic} from '../../domain/traffic';
import {TrafficDetails} from '../../domain/traffic-details';


export interface ITrafficDetailsService {
    readDetails(trafficList: Traffic[]): Observable<TrafficDetails[]>;
}
