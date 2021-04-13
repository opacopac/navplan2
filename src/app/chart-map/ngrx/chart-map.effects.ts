import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {OlMapActionTypes, OlMapClickedAction} from '../../ol-map/ngrx/ol-map.actions';
import {ChartMapState} from '../domain/chart-map-state';
import {getChartMapState} from './chart-map.selectors';
import {ChartMapClickedAction} from './chart-map.actions';


@Injectable()
export class ChartMapEffects {
    private readonly chartMapState$: Observable<ChartMapState> = this.appStore.select(getChartMapState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>) {
    }


    
    mapClicked$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(OlMapActionTypes.OL_MAP_CLICKED),
        withLatestFrom(this.chartMapState$),
        filter(([action, state]) => state.isActive),
        map(([action, state]) => action as OlMapClickedAction),
        map(action => new ChartMapClickedAction(action.clickPos))
    ));
}
