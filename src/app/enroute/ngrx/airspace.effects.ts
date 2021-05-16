import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirspaceActions} from './airspace.actions';
import {Observable, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getAirspaceState} from './airspace.selectors';
import {AirspaceService} from '../domain-service/airspace.service';
import {AirspaceState} from '../domain-model/airspace-state';


@Injectable()
export class AirspaceEffects {
    private readonly airspaceState$: Observable<AirspaceState> = this.appStore.select(pipe(getAirspaceState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airspaceService: AirspaceService,
    ) {
    }


    readAirspaces$ = createEffect(() => this.actions$.pipe(
        ofType(AirspaceActions.readAirspaces),
        withLatestFrom(this.airspaceState$),
        filter(([action, currentState]) => this.airspaceService.isReloadRequired(action, currentState)),
        switchMap(([action, currentState]) => {
            return this.airspaceService.readByExtent(action.extent, action.zoom).pipe(
                map(newState => AirspaceActions.showAirspaces(newState))
            );
        })
    ));
}
