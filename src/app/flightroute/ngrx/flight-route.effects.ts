import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {FlightrouteService} from '../rest-service/flightroute.service';
import {getCurrentUser} from '../../user/ngrx/user.selectors';
import {User} from '../../user/domain-model/user';
import {getFlightroute} from './flightroute.selectors';
import {Flightroute} from '../domain-model/flightroute';
import {FlightRouteActions} from './flight-route.actions';
import {MessageActions} from '../../message/ngrx/message.actions';
import {Message} from '../../message/domain-model/message';


@Injectable()
export class FlightRouteEffects {
    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));
    private flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private flightrouteService: FlightrouteService
    ) {
    }


    readFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightRouteActions.read),
        withLatestFrom(this.currentUser$),
        filter(([action, currentUser]) => action.flightrouteId > 0 && currentUser !== undefined),
        switchMap(([action, currentUser]) => this.flightrouteService.readFlightroute(action.flightrouteId, currentUser).pipe(
            map(route => FlightRouteActions.readSuccess({ flightroute: route })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading flight route', error)
            })))
        ))
    ));


    saveFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightRouteActions.save),
        switchMap(() => this.flightroute$),
        withLatestFrom(this.currentUser$),
        filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([flightroute, currentUser]) => this.flightrouteService.saveFlightroute(flightroute, currentUser).pipe(
            map(route => [
                FlightRouteActions.saveSuccess({ flightroute: route }),
                MessageActions.showMessage({
                    message: Message.success('Flight route saved successfully.')
                })
            ]),
            catchError(error => [
                of(MessageActions.showMessage({
                    message: Message.error('Error while saving flight route:', error)
                }))
            ])
        )),
        switchMap((actions) => actions)
    ));


    saveDuplicateFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightRouteActions.saveDuplicate),
        switchMap(() => this.flightroute$),
        withLatestFrom(this.currentUser$),
        filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([flightroute, currentUser]) => this.flightrouteService.duplicateFlightroute(flightroute, currentUser).pipe(
            map(route => [
                FlightRouteActions.saveSuccess({ flightroute: route }),
                MessageActions.showMessage({
                    message: Message.success('Flight route duplicated successfully.')
                })
            ]),
            catchError(error => [
                of(MessageActions.showMessage({
                    message: Message.error('Error while duplicating flight route:', error)
                }))
            ])
        )),
        switchMap((actions) => actions)
    ));


    deleteFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightRouteActions.delete),
        withLatestFrom(this.currentUser$),
        filter(([action, currentUser]) => action.flightrouteId > 0 && currentUser !== undefined),
        switchMap(([action, currentUser]) => this.flightrouteService.deleteFlightroute(action.flightrouteId, currentUser).pipe(
            map(() => MessageActions.showMessage({
                message: Message.success('Flight route deleted successfully.')
            })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error deleting flight route', error)
            })))
        )),
    ));
}
