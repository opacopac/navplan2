import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {
    FlightrouteActionTypes,
    SharedFlightrouteReadAction,
    SharedFlightrouteReadSuccessAction,
    SharedFlightrouteCreateSuccessAction,
    SharedFlightrouteReadErrorAction,
    SharedFlightrouteCreateErrorAction,
} from './flightroute.actions';
import {FlightrouteService} from '../rest/flightroute.service';
import {FlightrouteState} from '../domain/flightroute-state';
import {MessageService} from '../../message/services/message.service';
import {getFlightrouteState} from './flightroute.selectors';


@Injectable()
export class SharedFlightrouteEffects {
    private readonly flightrouteState$: Observable<FlightrouteState> = this.appStore.select(getFlightrouteState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly flightrouteService: FlightrouteService,
        private readonly messageService: MessageService
    ) {
    }


    @Effect()
    readSharedFlightrouteAction$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.SHARED_FLIGHTROUTE_READ),
        filter((action: SharedFlightrouteReadAction) => action.shareId !== undefined),
        switchMap(action => this.flightrouteService.readSharedFlightroute(
            action.shareId
        ).pipe(
            map(route => new SharedFlightrouteReadSuccessAction(route)),
            catchError(error => of(new SharedFlightrouteReadErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    readSharedFlightrouteErrorAction$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.SHARED_FLIGHTROUTE_READ_ERROR),
        tap((action: SharedFlightrouteReadErrorAction) => {
            this.messageService.showErrorMessage('Error reading shared flight route.', action.error);
        })
    );


    @Effect()
    createSharedFlightrouteAction$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.SHARED_FLIGHTROUTE_CREATE),
        withLatestFrom(this.flightrouteState$),
        filter(([action, flightrouteState]) => flightrouteState.flightroute !== undefined),
        switchMap(([action, flightrouteState]) => this.flightrouteService.createSharedFlightroute(
            flightrouteState.flightroute
        ).pipe(
            map(shareId => new SharedFlightrouteCreateSuccessAction(shareId)),
            catchError(error => of(new SharedFlightrouteCreateErrorAction(error)))
        ))
    );


    @Effect()
    createSharedFlightrouteErrorAction$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.SHARED_FLIGHTROUTE_CREATE_ERROR),
        tap((action: SharedFlightrouteCreateErrorAction) => {
            this.messageService.showErrorMessage('Error creating shared flight route.', action.error);
        })
    );
}
