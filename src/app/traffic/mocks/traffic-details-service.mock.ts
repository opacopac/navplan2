import {Observable} from 'rxjs';
import {ITrafficDetailsService} from '../domain-service/traffic-details/i-traffic-details-service';
import {TrafficDetails} from '../domain-model/traffic-details';
import {Traffic} from '../domain-model/traffic';


export class TrafficDetailsServiceMock implements ITrafficDetailsService {
    public readDetailsArgs: { trafficList: Traffic[] } = { trafficList: undefined };


    public readDetailsResult: Observable<TrafficDetails[]>;


    public readDetails(trafficList: Traffic[]): Observable<TrafficDetails[]> {
        this.readDetailsArgs =  { trafficList: trafficList };
        return this.readDetailsResult;
    }
}
