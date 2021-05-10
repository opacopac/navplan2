import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {
    FlightrouteActionTypes,
    SharedFlightrouteCreateErrorAction,
    SharedFlightrouteCreateSuccessAction,
    SharedFlightrouteReadAction,
    SharedFlightrouteReadErrorAction,
    SharedFlightrouteReadSuccessAction,
} from './flightroute.actions';
import {FlightrouteService} from '../rest-service/flightroute.service';
import {FlightrouteState} from './flightroute-state';
import {MessageService} from '../../message/domain-service/message.service';
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



    readSharedFlightrouteAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.SHARED_FLIGHTROUTE_READ),
        filter((action: SharedFlightrouteReadAction) => action.shareId !== undefined),
        switchMap(action => this.flightrouteService.readSharedFlightroute(
            action.shareId
        ).pipe(
            map(route => new SharedFlightrouteReadSuccessAction(route)),
            catchError(error => of(new SharedFlightrouteReadErrorAction(error)))
        ))
    ));



    readSharedFlightrouteErrorAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.SHARED_FLIGHTROUTE_READ_ERROR),
        tap((action: SharedFlightrouteReadErrorAction) => {
            this.messageService.showErrorMessage('Error reading shared flight route.', action.error);
        })
    ), { dispatch: false });



    createSharedFlightrouteAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.SHARED_FLIGHTROUTE_CREATE),
        withLatestFrom(this.flightrouteState$),
        filter(([action, flightrouteState]) => flightrouteState.flightroute !== undefined),
        switchMap(([action, flightrouteState]) => this.flightrouteService.createSharedFlightroute(
            flightrouteState.flightroute
        ).pipe(
            map(shareId => new SharedFlightrouteCreateSuccessAction(shareId)),
            catchError(error => of(new SharedFlightrouteCreateErrorAction(error)))
        ))
    ));



    createSharedFlightrouteErrorAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.SHARED_FLIGHTROUTE_CREATE_ERROR),
        tap((action: SharedFlightrouteCreateErrorAction) => {
            this.messageService.showErrorMessage('Error creating shared flight route.', action.error);
        })
    ));
}
