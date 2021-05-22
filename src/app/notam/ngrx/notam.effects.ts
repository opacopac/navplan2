import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {NotamActions} from './notam.actions';
import {NotamService} from '../domain-service/notam-service';
import {NotamState} from '../domain-model/notam-state';
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


    readNotamAction$ = createEffect(() => this.actions$.pipe(
        ofType(NotamActions.readNotams),
        withLatestFrom(this.notamState$),
        switchMap(([action, state]) => this.notamService.readByExtent(action.extent, action.zoom, state).pipe(
            map(newState => NotamActions.showNotams(newState))
        ))
    ));
}
