import {Observable} from 'rxjs';
import {AirportState} from '../domain-model/airport-state';


export abstract class IAirportStateProvider {
    public abstract getStateObservable(): Observable<AirportState>;
}
