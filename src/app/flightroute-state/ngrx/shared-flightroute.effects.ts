import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {FlightrouteState} from '../state-model/flightroute-state';
import {getFlightrouteState} from './flightroute.selectors';
import {SharedFlightRouteActions} from './shared-flight-route.actions';
import {MessageActions} from '../../message-state/ngrx/message.actions';
import {Message} from '../../message/domain-model/message';
import {IFlightrouteService} from '../../flightroute/domain-service/i-flightroute.service';


@Injectable()
export class SharedFlightrouteEffects {
    private readonly flightrouteState$: Observable<FlightrouteState> = this.appStore.select(getFlightrouteState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly flightrouteService: IFlightrouteService
    ) {
    }


    readSharedFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(SharedFlightRouteActions.read),
        filter(action => action.shareId !== undefined),
        switchMap(action => this.flightrouteService.readSharedFlightroute(action.shareId).pipe(
            map(route => SharedFlightRouteActions.show({ flightroute: route })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading shared flight route:', error)
            })))
        ))
    ));


    createSharedFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(SharedFlightRouteActions.save),
        withLatestFrom(this.flightrouteState$),
        filter(([action, flightrouteState]) => flightrouteState.flightroute !== undefined),
        switchMap(([action, flightrouteState]) => this.flightrouteService.createSharedFlightroute(flightrouteState.flightroute).pipe(
            map(shareId => SharedFlightRouteActions.saveSuccess({ shareId: shareId })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error creating shared flight route:', error)
            })))
        ))
    ));
}
