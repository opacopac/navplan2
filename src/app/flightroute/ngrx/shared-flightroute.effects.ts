import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {FlightrouteState} from './flightroute-state';
import {getFlightrouteState} from './flightroute.selectors';
import {SharedFlightRouteActions} from './shared-flight-route.actions';
import {MessageActions} from '../../message/ngrx/message.actions';
import {Message} from '../../message/domain-model/message';
import {IFlightrouteRepo} from '../domain-service/i-flightroute-repo';


@Injectable()
export class SharedFlightrouteEffects {
    private readonly flightrouteState$: Observable<FlightrouteState> = this.appStore.select(getFlightrouteState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly flightrouteRepo: IFlightrouteRepo
    ) {
    }


    readSharedFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(SharedFlightRouteActions.read),
        filter(action => action.shareId !== undefined),
        switchMap(action => this.flightrouteRepo.readSharedFlightroute(action.shareId).pipe(
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
        switchMap(([action, flightrouteState]) => this.flightrouteRepo.createSharedFlightroute(flightrouteState.flightroute).pipe(
            map(shareId => SharedFlightRouteActions.saveSuccess({ shareId: shareId })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error creating shared flight route:', error)
            })))
        ))
    ));
}
