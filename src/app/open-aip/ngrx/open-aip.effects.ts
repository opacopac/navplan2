import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {OpenAipState} from '../domain-model/open-aip-state';
import {
    OpenAipActionTypes,
    ReadOpenAipItemsAction,
    ReadOpenAipItemsErrorAction,
    ReadOpenAipItemsSuccessAction
} from './open-aip.actions';
import {getOpenAipState} from './open-aip.selectors';
import {OpenAipService} from '../domain-service/open-aip-service';
import {MessageService} from '../../message/domain-service/message.service';


@Injectable()
export class OpenAipEffects {
    private readonly openAipState$: Observable<OpenAipState> = this.appStore.select(getOpenAipState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly openAipRepo: OpenAipService,
        private readonly messageService: MessageService
    ) {
    }


    readOpenAipItemsAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(OpenAipActionTypes.OPEN_AIP_READ_ITEMS),
        map(action => action as ReadOpenAipItemsAction),
        withLatestFrom(this.openAipState$),
        switchMap(([action, state]) => this.openAipRepo.readByExtent(
            action.extent,
            action.zoom,
            state
        ).pipe(
            map(openAipItems => new ReadOpenAipItemsSuccessAction(openAipItems)),
            catchError(error => of(new ReadOpenAipItemsErrorAction(error)))
        ))
    ));


    readOpenAipItemsErrorAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(OpenAipActionTypes.OPEN_AIP_READ_ITEMS_ERROR),
        tap((action: ReadOpenAipItemsErrorAction) => {
            this.messageService.showErrorMessage('error reading open aip items.', action.error);
        })
    ), {dispatch: false});
}
