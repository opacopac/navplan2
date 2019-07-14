import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {debounceTime, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {OlMapActionTypes, OlMapMovedZoomedRotatedAction} from '../../ol-map/ngrx/ol-map.actions';
import {ReadOpenAipItemsAction} from '../../open-aip/ngrx/open-aip.actions';
import {NavMapState} from '../domain/nav-map-state';
import {getNavMapState} from './nav-map.selectors';
import {ReadNotamAction} from '../../notam/ngrx/notam.actions';
import {ReadMetarTafAction} from '../../metar-taf/ngrx/metar-taf.actions';


@Injectable()
export class NavMapEffects {
    private readonly navMapState$: Observable<NavMapState> = this.appStore.select(getNavMapState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>
    ) {
    }


    @Effect()
    mapMovedZoomedRotatedAction$: Observable<Action> = this.actions$.pipe(
        ofType(OlMapActionTypes.OL_MAP_MOVED_ZOOMED_ROTATED),
        map(action => action as OlMapMovedZoomedRotatedAction),
        debounceTime(500),
        withLatestFrom(this.navMapState$),
        filter(([action, state]) => state.isActive),
        switchMap(([action, state]) => [
            new ReadOpenAipItemsAction(action.extent, action.zoom),
            new ReadNotamAction(action.extent, action.zoom),
            new ReadMetarTafAction(action.extent, action.zoom)
            // TODO: trigger read for other modules (traffic, userpoint)
        ])
    );
}
