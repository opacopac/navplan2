import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {MapActionTypes, MapMovedZoomedRotatedAction} from '../map/map.actions';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {MapfeaturesService} from './services/mapfeatures.service';
import {getCurrentUser} from '../user/user.selectors';
import {getMapZoom} from '../map/map.selectors';
import {LoadMapFeaturesErrorAction, LoadMapFeaturesSuccessAction} from './map-features.actions';


@Injectable()
export class MapFeaturesEffects {
    private currentUser$ = this.appStore.select(getCurrentUser);
    private zoom$ = this.appStore.select(getMapZoom);


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private mapFeaturesService: MapfeaturesService) {
    }


    @Effect()
    mapMovedZoomedRotated$: Observable<Action> = this.actions$.pipe(
        ofType(MapActionTypes.MAP_MOVED_ZOOMED_ROTATED),
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
