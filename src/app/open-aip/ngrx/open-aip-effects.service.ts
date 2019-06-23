import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {debounceTime, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {getMapZoom} from '../../ol-map/ngrx/ol-map.selectors';
import {getCurrentUser} from '../../user/ngrx/user.selectors';
import {OlMapActionTypes, OlMapMovedZoomedRotatedAction} from '../../ol-map/ngrx/ol-map.actions';
import {LoadOpenAIpItemsSuccessAction} from './open-aip.actions';
import {OpenAipService} from '../services/open-aip.service';


@Injectable()
export class OpenAipEffects {
    private currentUser$ = this.appStore.pipe(select(getCurrentUser));
    private zoom$ = this.appStore.pipe(select(getMapZoom));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private openAipService: OpenAipService) {
    }


    @Effect()
    mapMovedZoomedRotated$: Observable<Action> = this.actions$.pipe(
        ofType(OlMapActionTypes.OL_MAP_MOVED_ZOOMED_ROTATED),
        debounceTime(500),
        map(action => action as OlMapMovedZoomedRotatedAction),
        withLatestFrom(this.currentUser$, this.zoom$),
        switchMap(([action, currentUser, zoom]) => this.openAipService.load(action.extent, zoom, currentUser)
            .pipe(
                map(openAipItems => new LoadOpenAIpItemsSuccessAction(openAipItems, action.extent, zoom, currentUser)),
                // catchError((error, subject) => new LoadOpenAipItemsErrorAction(error))
            )
        )
    );
}
