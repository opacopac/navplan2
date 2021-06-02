import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IMetarTafStateProvider} from '../domain-service/i-metar-taf-state-provider';
import {MetarTafState} from '../domain-model/metar-taf-state';
import {getMetarTafState} from './metar-taf.selectors';


@Injectable()
export class NgrxMetarTafStateProvider implements IMetarTafStateProvider {
    constructor(private readonly appStore: Store<any>) {
    }


    public getStateObservable(): Observable<MetarTafState> {
        return this.appStore.select(getMetarTafState);
    }
}
