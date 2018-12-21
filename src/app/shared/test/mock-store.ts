import {Action, ActionsSubject, ReducerManager, StateObservable, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, of} from 'rxjs';


export class MockStore extends Store<any> {
    private state: BehaviorSubject<any>;
    private _dispatchCallCount: number;
    private _dispatchedActions: Action[];


    get dispatchCallCount(): number {
        return this._dispatchCallCount;
    }


    get dispatchedActions(): Action[] {
        return this._dispatchedActions;
    }


    public constructor(initialState: any) {
        super(undefined, undefined, undefined);
        this.state = new BehaviorSubject(initialState);
        this.resetStats();
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
