import {Observable} from 'rxjs';
import {ITrafficDetailsService} from '../use-case/traffic-details/i-traffic-details-service';
import {TrafficDetails} from '../domain/traffic-details';
import {Traffic} from '../domain/traffic';


export class TrafficDetailsServiceMock implements ITrafficDetailsService {
    public readDetailsArgs: { trafficList: Traffic[] } = { trafficList: undefined };


    public readDetailsResult: Observable<TrafficDetails[]>;


    public readDetails(trafficList: Traffic[]): Observable<TrafficDetails[]> {
        this.readDetailsArgs =  { trafficList: trafficList };
        return this.readDetailsResult;
    }
}
