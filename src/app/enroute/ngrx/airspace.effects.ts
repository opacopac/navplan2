import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirspaceActions} from './airspace.actions';
import {Observable, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getAirspaceState} from './airspace.selectors';
import {AirspaceState} from '../domain-model/airspace-state';
import {IAirspaceService} from '../domain-service/i-airspace.service';


@Injectable()
export class AirspaceEffects {
    private readonly airspaceState$: Observable<AirspaceState> = this.appStore.select(pipe(getAirspaceState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airspaceService: IAirspaceService,
    ) {
    }


    readAirspaces$ = createEffect(() => this.actions$.pipe(
        ofType(AirspaceActions.readAirspaces),
        switchMap(action => this.airspaceService.readByExtent(
            action.extent,
            action.zoom
        )),
        map(newState => AirspaceActions.showAirspaces(newState))
    ));
}
