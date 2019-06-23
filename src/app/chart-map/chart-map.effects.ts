import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {OlMapActionTypes, OlMapClickedAction} from '../ol-map/ngrx/ol-map.actions';
import {ChartMapClickedAction} from './chart-map.actions';


@Injectable()
export class ChartMapEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>) {
    }


    @Effect()
    mapClicked$: Observable<Action> = this.actions$.pipe(
        ofType(OlMapActionTypes.OL_MAP_CLICKED),
        map(action => action as OlMapClickedAction),
        map(action => new ChartMapClickedAction(action.clickPos))
    );
}
