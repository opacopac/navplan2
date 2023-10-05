import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirspaceActions} from './airspace.actions';
import {Observable, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getAirspaceState} from './airspace.selectors';
import {AirspaceState} from '../../state-model/airspace-state';
import {environment} from '../../../../../environments/environment';
import {IAirspaceRepo} from '../../../domain/service/i-airspace-repo';
import {BaseMapActions} from '../../../../base-map/state/ngrx/base-map.actions';


@Injectable()
export class AirspaceEffects {
    private readonly airspaceState$: Observable<AirspaceState> = this.appStore.select(pipe(getAirspaceState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airspaceRepo: IAirspaceRepo,
    ) {
    }


    updateAirspacesAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMovedDebounced),
        withLatestFrom(this.airspaceState$),
        filter(([action, currentState]) => !currentState.extent
            || !action.extent
            || currentState.zoom !== action.zoom
            || !currentState.extent.containsExtent2d(action.extent)),
        switchMap(([action, currentState]) => this.airspaceRepo.readAirspacesByExtent(
            action.extent.getOversizeExtent(environment.mapOversizeFactor),
            action.zoom
        ).pipe(
            map(airspaces => AirspaceActions.readSuccess({
                extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                zoom: action.zoom,
                airspaces: airspaces,
            }))
        )),
    ));
}
