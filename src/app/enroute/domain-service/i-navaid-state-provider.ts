import {Observable} from 'rxjs';
import {NavaidState} from '../domain-model/navaid-state';


export abstract class INavaidStateProvider {
    public abstract getStateObservable(): Observable<NavaidState>;
}
