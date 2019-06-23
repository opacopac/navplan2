import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {catchError, debounceTime, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {OlMapActionTypes, OlMapMovedZoomedRotatedAction} from '../ol-map/ngrx/ol-map.actions';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MapfeaturesService} from './services/mapfeatures.service';
import {getCurrentUser} from '../user/user.selectors';
import {getMapZoom} from '../ol-map/ngrx/ol-map.selectors';
import {LoadMapFeaturesErrorAction, LoadMapFeaturesSuccessAction} from './map-features.actions';


@Injectable()
export class MapFeaturesEffects {
    private currentUser$ = this.appStore.pipe(select(getCurrentUser));
    private zoom$ = this.appStore.pipe(select(getMapZoom));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private mapFeaturesService: MapfeaturesService) {
    }


    @Effect()
    mapMovedZoomedRotated$: Observable<Action> = this.actions$.pipe(
        ofType(OlMapActionTypes.OL_MAP_MOVED_ZOOMED_ROTATED),
        debounceTime(500),
        map(action => action as OlMapMovedZoomedRotatedAction),
        withLatestFrom(this.currentUser$, this.zoom$),
        switchMap(([action, currentUser, zoom]) => this.mapFeaturesService.load(action.extent, zoom, currentUser)
            .pipe(
                map(mapFeatures => new LoadMapFeaturesSuccessAction(mapFeatures, action.extent, zoom, currentUser)),
                // catchError((error, subject) => new LoadMapFeaturesErrorAction(error))
            )
        )
    );
}
