import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {getCurrentUser} from '../../user/ngrx/user.selectors';
import {User} from '../../user/domain-model/user';
import {getFlightroute} from '../../flightroute-state/ngrx/flightroute.selectors';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {FlightRouteCrudActions} from './flight-route-crud.actions';
import {MessageActions} from '../../message/ngrx/message.actions';
import {Message} from '../../message/domain-model/message';
import {IFlightrouteRepo} from '../../flightroute/domain-service/i-flightroute-repo';
import {FlightrouteActions} from '../../flightroute-state/ngrx/flightroute.actions';


@Injectable()
export class FlightRouteCrudEffects {
    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));
    private flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private flightrouteRepo: IFlightrouteRepo
    ) {
    }


    readFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightRouteCrudActions.read),
        withLatestFrom(this.currentUser$),
        filter(([action, currentUser]) => action.flightrouteId > 0 && currentUser !== undefined),
        switchMap(([action, currentUser]) => this.flightrouteRepo.readFlightroute(action.flightrouteId, currentUser).pipe(
            map(route => FlightrouteActions.update({ flightroute: route })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading flight route', error)
            })))
        ))
    ));


    saveFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightRouteCrudActions.save),
        switchMap(() => this.flightroute$),
        withLatestFrom(this.currentUser$),
        filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([flightroute, currentUser]) => this.flightrouteRepo.saveFlightroute(flightroute, currentUser).pipe(
            map(route => [
                FlightrouteActions.update({ flightroute: route }),
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
        ofType(FlightRouteCrudActions.saveDuplicate),
        switchMap(() => this.flightroute$),
        withLatestFrom(this.currentUser$),
        filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([flightroute, currentUser]) => this.flightrouteRepo.duplicateFlightroute(flightroute, currentUser).pipe(
            map(route => [
                FlightrouteActions.update({ flightroute: route }),
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
        ofType(FlightRouteCrudActions.delete),
        withLatestFrom(this.currentUser$),
        filter(([action, currentUser]) => action.flightrouteId > 0 && currentUser !== undefined),
        switchMap(([action, currentUser]) => this.flightrouteRepo.deleteFlightroute(action.flightrouteId, currentUser).pipe(
            map(() => MessageActions.showMessage({
                message: Message.success('Flight route deleted successfully.')
            })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error deleting flight route', error)
            })))
        )),
    ));
}
