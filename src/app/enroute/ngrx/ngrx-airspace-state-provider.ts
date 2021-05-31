import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAirspaceStateProvider} from '../domain-service/i-airspace-state-provider';
import {AirspaceState} from '../domain-model/airspace-state';
import {getAirspaceState} from './airspace.selectors';


@Injectable()
export class NgrxAirspaceStateProvider implements IAirspaceStateProvider {
    constructor(private readonly appStore: Store<any>) {
    }


    public getStateObservable(): Observable<AirspaceState> {
        return this.appStore.select(getAirspaceState);
    }
}
