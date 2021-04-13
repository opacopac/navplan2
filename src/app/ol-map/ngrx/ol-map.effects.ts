import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {OlMapService} from '../use-case/ol-map.service';
import {OlMapActionTypes} from './ol-map.actions';
import {tap} from 'rxjs/operators';


@Injectable()
export class OlMapEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private mapService: OlMapService) {
    }


    
    zoomIn$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(OlMapActionTypes.OL_MAP_ZOOM_IN),
        tap((action) => {
            this.mapService.zoomIn();
        })
    ), { dispatch: false });



    
    zoomOut$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(OlMapActionTypes.OL_MAP_ZOOM_OUT),
        tap((action) => {
            this.mapService.zoomOut();
        })
    ), { dispatch: false });
}
