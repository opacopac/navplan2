import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAirportStateProvider} from '../domain-service/i-airport-state-provider';
import {AirportState} from '../domain-model/airport-state';
import {getAirportState} from './airport.selectors';


@Injectable()
export class NgrxAirportStateProvider implements IAirportStateProvider {
    constructor(private readonly appStore: Store<any>) {
    }


    public getStateObservable(): Observable<AirportState> {
        return this.appStore.select(getAirportState);
    }
}
