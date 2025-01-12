import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {getCurrentUser} from '../../../user/state/ngrx/user.selectors';
import {User} from '../../../user/domain/model/user';
import {getFlightroute} from './flightroute.selectors';
import {Flightroute} from '../../domain/model/flightroute';
import {FlightrouteCrudActions} from './flightroute-crud.actions';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {FlightrouteActions} from './flightroute.actions';
import {IFlightrouteService} from '../../domain/service/i-flightroute.service';
import {FlightrouteListActions} from './flightroute-list.actions';


@Injectable()
export class FlightRouteCrudEffects {
    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));
    private flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private flightrouteService: IFlightrouteService
    ) {
    }


    readFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteCrudActions.read),
        withLatestFrom(this.currentUser$),
        filter(([action, currentUser]) => action.flightrouteId > 0 && currentUser !== undefined),
        switchMap(([action, currentUser]) => this.flightrouteService.readFlightroute(action.flightrouteId, currentUser).pipe(
            map(route => FlightrouteActions.recalculate({flightroute: route})),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading flight route', error)
            })))
        ))
    ));


    saveFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteCrudActions.save),
        withLatestFrom(this.flightroute$, this.currentUser$),
        filter(([action, flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([action, flightroute, currentUser]) => this.flightrouteService.saveFlightroute(flightroute, currentUser).pipe(
            map(route => [
                FlightrouteListActions.readList(),
                FlightrouteActions.update({flightroute: route}),
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
        ofType(FlightrouteCrudActions.saveDuplicate),
        withLatestFrom(this.flightroute$, this.currentUser$),
        filter(([action, flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([action, flightroute, currentUser]) => this.flightrouteService.duplicateFlightroute(flightroute, currentUser).pipe(
            map(route => [
                FlightrouteListActions.readList(),
                FlightrouteActions.update({flightroute: route}),
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
        ofType(FlightrouteCrudActions.delete),
        withLatestFrom(this.currentUser$),
        filter(([action, currentUser]) => action.flightrouteId > 0 && currentUser !== undefined),
        switchMap(([action, currentUser]) => this.flightrouteService.deleteFlightroute(action.flightrouteId, currentUser).pipe(
            map(() => [
                FlightrouteListActions.readList(),
                MessageActions.showMessage({
                    message: Message.success('Flight route deleted successfully.')
                }),
            ]),
            catchError(error => [
                of(MessageActions.showMessage({
                    message: Message.error('Error deleting flight route', error)
                }))
            ])
        )),
        switchMap((actions) => actions)
    ));
}
