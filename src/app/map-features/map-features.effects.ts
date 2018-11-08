import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {catchError, debounceTime, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {MapActionTypes, MapMovedZoomedRotatedAction} from '../base-map/base-map.actions';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MapfeaturesService} from './services/mapfeatures.service';
import {getCurrentUser} from '../user/user.selectors';
import {getMapZoom} from '../base-map/base-map.selectors';
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
        ofType(MapActionTypes.MAP_MOVED_ZOOMED_ROTATED),
        debounceTime(500),
        map(action => action as MapMovedZoomedRotatedAction),
        withLatestFrom(this.currentUser$, this.zoom$),
        switchMap(([action, currentUser, zoom]) => this.mapFeaturesService.load(action.extent, zoom, currentUser)
            .pipe(
                map(mapFeatures => new LoadMapFeaturesSuccessAction(mapFeatures, action.extent, zoom, currentUser)),
                // catchError((error, subject) => new LoadMapFeaturesErrorAction(error))
            )
        )
    );
}
