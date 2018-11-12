import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {BaseMapActionTypes, BaseMapClickedAction} from '../base-map/base-map.actions';
import {ChartMapClickedAction} from './chart-map.actions';


@Injectable()
export class ChartMapEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>) {
    }


    @Effect()
    mapClicked$: Observable<Action> = this.actions$.pipe(
        ofType(BaseMapActionTypes.BASEMAP_CLICKED),
        map(action => action as BaseMapClickedAction),
        map(action => new ChartMapClickedAction(action.clickPos))
    );
}
