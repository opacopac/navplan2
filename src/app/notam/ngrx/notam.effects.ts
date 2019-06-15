import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {NotamService} from '../rest/notam.service';
import {BaseMapActionTypes, BaseMapMovedZoomedRotatedAction} from '../../base-map/base-map.actions';
import {LoadNotamErrorAction, LoadNotamSuccessAction} from './notam.actions';
import {ReadNotams} from '../use-case/read-notams';


@Injectable()
export class NotamEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private notamService: NotamService) {
    }


    @Effect()
    notamLoadAction$: Observable<Action> = this.actions$
        .pipe(
            ofType(BaseMapActionTypes.BASEMAP_MOVED_ZOOMED_ROTATED),
            map(action => action as BaseMapMovedZoomedRotatedAction),
            debounceTime(500),
            switchMap(action => new ReadNotams(this.notamService).readByExtent(action.extent, action.zoom)
                .pipe(
                    map(notamList => new LoadNotamSuccessAction(notamList, action.extent, action.zoom)),
                    catchError(error => of(new LoadNotamErrorAction(error)))
                )
            )
        );
}
