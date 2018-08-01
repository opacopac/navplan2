import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {NotamService} from './services/notam.service';
import {MapActionTypes, MapMovedZoomedRotatedAction} from '../map/map.actions';
import {LoadNotamErrorAction, LoadNotamSuccessAction} from './notam.actions';


@Injectable()
export class NotamEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private notamService: NotamService) {
    }


    @Effect()
    NotamLoad$: Observable<Action> = this.actions$
        .pipe(
            ofType(MapActionTypes.MAP_MOVED_ZOOMED_ROTATED),
            debounceTime(500),
            map(action => action as MapMovedZoomedRotatedAction),
            switchMap(action => this.notamService.load(action.extent, action.zoom)
                .pipe(
                    map(notamList => new LoadNotamSuccessAction(notamList, action.extent, action.zoom)),
                    catchError(error => of(new LoadNotamErrorAction(error)))
                )
            )
        );
}
