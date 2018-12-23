import {Action, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MockStoreConfig {
    public initialState: any;
}


@Injectable({
    providedIn: 'root'
})
export class MockStore extends Store<any> {
    private state: BehaviorSubject<any>;
    private _dispatchCallCount: number;
    private _dispatchedActions: Action[];


    public constructor(config: MockStoreConfig) {
        super(undefined, undefined, undefined);
        this.state = new BehaviorSubject(config.initialState);
        this.resetStats();
    }


    get dispatchCallCount(): number {
        return this._dispatchCallCount;
    }


    get dispatchedActions(): Action[] {
        return this._dispatchedActions;
    }


    public setState(state: any) {
        this.state.next(state);
    }


    public select(selector: any): Observable<any> {
        return of(selector(this.state.getValue()));
    }


    public dispatch(action: Action) {
        this._dispatchCallCount++;
        this._dispatchedActions.push(action);
    }


    public resetStats() {
        this._dispatchCallCount = 0;
        this._dispatchedActions = [];
    }
}
