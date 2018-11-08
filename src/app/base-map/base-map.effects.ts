import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapService} from './services/base-map.service';
import {MapActionTypes} from './base-map.actions';
import {tap} from 'rxjs/operators';


@Injectable()
export class BaseMapEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private mapService: BaseMapService) {
    }


    @Effect({ dispatch: false })
    zoomIn$: Observable<Action> = this.actions$.pipe(
        ofType(MapActionTypes.MAP_ZOOM_IN),
        tap((action) => {
            this.mapService.zoomIn();
        })
    );



    @Effect({ dispatch: false })
    zoomOut$: Observable<Action> = this.actions$.pipe(
        ofType(MapActionTypes.MAP_ZOOM_OUT),
        tap((action) => {
            this.mapService.zoomOut();
        })
    );
}
