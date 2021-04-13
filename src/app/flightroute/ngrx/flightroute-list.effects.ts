import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {
    FlightrouteActionTypes,
    FlightrouteReadListAction,
    FlightrouteReadListErrorAction,
    FlightrouteReadListSuccessAction
} from './flightroute.actions';
import {UserState} from '../../user/domain/user-state';
import {FlightrouteService} from '../rest/flightroute.service';
import {getUserState} from '../../user/ngrx/user.selectors';
import {MessageService} from '../../message/services/message.service';


@Injectable()
export class FlightrouteListEffects {
    private readonly userState$: Observable<UserState> = this.appStore.select(getUserState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly flightrouteService: FlightrouteService,
        private readonly messageService: MessageService
    ) {
    }



    readFlightrouteListAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_LIST_READ),
        map(action => action as FlightrouteReadListAction),
        withLatestFrom(this.userState$),
        filter(([action, userState]) => userState.currentUser !== undefined),
        switchMap(([action, userState]) => this.flightrouteService.readFlightrouteList(
            userState.currentUser
        ).pipe(
            map(routeList => new FlightrouteReadListSuccessAction(routeList)),
            catchError(error => of(new FlightrouteReadListErrorAction(error)))
        ))
    ));



    readFlightrouteListErrorAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_LIST_READ_ERROR),
        map(action => action as FlightrouteReadListErrorAction),
        tap((action: FlightrouteReadListErrorAction) => {
            this.messageService.showErrorMessage('Error reading flight route list.', action.error);
        }),
    ), { dispatch: false });
}
