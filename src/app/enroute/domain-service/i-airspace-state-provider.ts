import {Observable} from 'rxjs';
import {AirspaceState} from '../domain-model/airspace-state';


export abstract class IAirspaceStateProvider {
    public abstract getStateObservable(): Observable<AirspaceState>;
}
