import {Action, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable()
export class MockStore extends Store<any> {
    private state: BehaviorSubject<any>;
    private _dispatchedActions: Action[] = [];


    public constructor(rootStateName: string, initialState: any) {
        super(undefined, undefined, undefined);
        const rootState = {};
        rootState[rootStateName] = initialState;
        this.state = new BehaviorSubject<any>(rootState);
    }


    public select(selector: any): Observable<any> {
        return of(selector(this.state.getValue()));
    }


    public dispatch(action: Action) {
        this._dispatchedActions.push(action);
    }


    public getDispatchedActions(): Action[] {
        return this._dispatchedActions;
    }


    public setState(rootStateName: string, newState: any) {
        const rootState = this.state.getValue();
        rootState[rootStateName] = newState;
        this.state.next(rootState);
    }
}
