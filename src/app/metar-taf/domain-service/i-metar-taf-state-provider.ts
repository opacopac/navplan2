import {Observable} from 'rxjs';
import {MetarTafState} from '../domain-model/metar-taf-state';


export abstract class IMetarTafStateProvider {
    public abstract getStateObservable(): Observable<MetarTafState>;
}
