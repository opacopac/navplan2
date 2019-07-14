import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {NotamService} from '../rest/notam.service';
import {ReadNotamAction, ReadNotamErrorAction, ReadNotamSuccessAction, NotamActionTypes} from './notam.actions';
import {NotamRepo} from '../use-case/notam-repo';
import {SystemConfig} from '../../system/system-config';
import {NotamState} from '../domain/notam-state';
import {getNotamState} from './notam.selectors';


@Injectable()
export class NotamEffects {
    private readonly notamState$: Observable<NotamState> = this.appStore.select(getNotamState);
    private readonly notamRepo: NotamRepo;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        notamService: NotamService,
        config: SystemConfig
    ) {
        this.notamRepo = new NotamRepo(notamService, config);
    }


    @Effect()
    readNotamAction$: Observable<Action> = this.actions$.pipe(
        ofType(NotamActionTypes.NOTAM_READ),
        map(action => action as ReadNotamAction),
        withLatestFrom(this.notamState$),
        switchMap(([action, state]) => this.notamRepo.readByExtent(action.extent, action.zoom, state).pipe(
            map(result => new ReadNotamSuccessAction(result)),
            catchError(error => of(new ReadNotamErrorAction(error)))
        ))
    );
}
