import {Observable} from 'rxjs';
import {Traffic} from '../../../traffic/domain/model/traffic';
import {TrafficDetails} from '../model/traffic-details';


export abstract class ITrafficDetailsService {
    abstract readDetails(trafficList: Traffic[]): Observable<TrafficDetails[]>;
}
