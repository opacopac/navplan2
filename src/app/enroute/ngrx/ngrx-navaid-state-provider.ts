import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {NavaidState} from '../domain-model/navaid-state';
import {INavaidStateProvider} from '../domain-service/i-navaid-state-provider';
import {Store} from '@ngrx/store';
import {getNavaidState} from './navaid.selectors';


@Injectable()
export class NgrxNavaidStateProvider implements INavaidStateProvider {
    constructor(private readonly appStore: Store<any>) {
    }


    public getStateObservable(): Observable<NavaidState> {
        return this.appStore.select(getNavaidState);
    }
}
