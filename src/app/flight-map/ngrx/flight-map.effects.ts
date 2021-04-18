import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {debounceTime, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActionTypes, BaseMapMovedZoomedRotatedAction} from '../../base-map/ngrx/base-map.actions';
import {ReadOpenAipItemsAction} from '../../open-aip/ngrx/open-aip.actions';
import {FlightMapState} from '../domain-model/flight-map-state';
import {getFlightMapState} from './flight-map.selectors';
import {ReadNotamAction} from '../../notam/ngrx/notam.actions';
import {ReadMetarTafAction} from '../../metar-taf/ngrx/metar-taf.actions';


@Injectable()
export class FlightMapEffects {
    private readonly flightMapState$: Observable<FlightMapState> = this.appStore.select(getFlightMapState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>
    ) {
    }


    mapMovedZoomedRotatedAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActionTypes.BASE_MAP_MOVED_ZOOMED_ROTATED),
        map(action => action as BaseMapMovedZoomedRotatedAction),
        debounceTime(500),
        withLatestFrom(this.flightMapState$),
        switchMap(([action, state]) => [
            new ReadOpenAipItemsAction(action.extent, action.zoom),
            new ReadNotamAction(action.extent, action.zoom),
            new ReadMetarTafAction(action.extent, action.zoom)
            // TODO: trigger read for other modules (traffic, userpoint)
        ])
    ));
}
