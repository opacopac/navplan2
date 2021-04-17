import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActionTypes} from './base-map.actions';
import {tap} from 'rxjs/operators';
import {BaseMapService} from '../domain-service/base-map.service';


@Injectable()
export class BaseMapEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private mapService: BaseMapService) {
    }



    zoomIn$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActionTypes.BASE_MAP_ZOOM_IN),
        tap((action) => {
            this.mapService.zoomIn();
        })
    ), { dispatch: false });




    zoomOut$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActionTypes.BASE_MAP_ZOOM_OUT),
        tap((action) => {
            this.mapService.zoomOut();
        })
    ), { dispatch: false });
}
