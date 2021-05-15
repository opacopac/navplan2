import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {NotamActionTypes, ReadNotamAction, ReadNotamErrorAction, ReadNotamSuccessAction} from './notam.actions';
import {NotamService} from '../domain-service/notam-service';
import {NotamState} from './notam-state';
import {getNotamState} from './notam.selectors';


@Injectable()
export class NotamEffects {
    private readonly notamState$: Observable<NotamState> = this.appStore.select(getNotamState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly notamService: NotamService
    ) {
    }


    readNotamAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(NotamActionTypes.NOTAM_READ),
        map(action => action as ReadNotamAction),
        withLatestFrom(this.notamState$),
        switchMap(([action, state]) => this.notamService.readByExtent(action.extent, action.zoom, state).pipe(
            map(result => new ReadNotamSuccessAction(result)),
            catchError(error => of(new ReadNotamErrorAction(error)))
        ))
    ));
}
