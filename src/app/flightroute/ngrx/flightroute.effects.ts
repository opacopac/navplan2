import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {MessageService} from '../../message/services/message.service';
import {FlightrouteService} from '../rest/flightroute.service';
import {
    FlightrouteActionTypes,
    FlightrouteDeleteAction,
    FlightrouteDeleteErrorAction,
    FlightrouteDeleteSuccessAction,
    FlightrouteReadAction,
    FlightrouteReadErrorAction,
    FlightrouteReadListAction,
    FlightrouteReadSuccessAction,
    FlightrouteSaveErrorAction,
    FlightrouteSaveSuccessAction,
} from './flightroute.actions';
import {getCurrentUser} from '../../user/ngrx/user.selectors';
import {User} from '../../user/domain/user';
import {getFlightroute} from './flightroute.selectors';
import {Flightroute} from '../domain/flightroute';


@Injectable()
export class FlightrouteEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private flightrouteService: FlightrouteService,
        private messageService: MessageService) {
    }


    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));
    private flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));



    readFlightroute$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_READ),
        map((action: FlightrouteReadAction) => action.flightrouteId),
        withLatestFrom(this.currentUser$),
        filter(([flightrouteId, currentUser]) => flightrouteId > 0 && currentUser !== undefined),
        switchMap(([flightrouteId, currentUser]) => this.flightrouteService.readFlightroute(flightrouteId, currentUser).pipe(
            map(route => new FlightrouteReadSuccessAction(route)),
            catchError(error => of(new FlightrouteReadErrorAction(error)))
        ))
));



    readFlightrouteError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_READ_ERROR),
        tap((action: FlightrouteReadErrorAction) => {
            this.messageService.showErrorMessage('Error reading flight route', action.error);
        })
    ), { dispatch: false});



    createFlightroute$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_CREATE),
        switchMap(action => this.flightroute$),
        withLatestFrom(this.currentUser$),
        filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([flightroute, currentUser]) => this.flightrouteService.createFlightroute(flightroute, currentUser).pipe(
            map(route => new FlightrouteSaveSuccessAction(route)),
            catchError(error => of(new FlightrouteSaveErrorAction(error)))
        ))
    ));



    updateFlightroute$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_UPDATE),
        switchMap(() => this.flightroute$),
        withLatestFrom(this.currentUser$),
        filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([flightroute, currentUser]) => this.flightrouteService.updateFlightroute(flightroute, currentUser).pipe(
            map(route => new FlightrouteSaveSuccessAction(route)),
            catchError(error => of(new FlightrouteSaveErrorAction(error)))
        ))
    ));



    duplicateFlightroute$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_DUPLICATE),
        switchMap(action => this.flightroute$),
        withLatestFrom(this.currentUser$),
        filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([flightroute, currentUser]) => this.flightrouteService.duplicateFlightroute(flightroute, currentUser).pipe(
            map(route => new FlightrouteSaveSuccessAction(route)),
            catchError(error => of(new FlightrouteSaveErrorAction(error)))
        ))
    ));



    saveFlightrouteSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_SAVE_SUCCESS),
        map((action: FlightrouteSaveSuccessAction) => new FlightrouteReadListAction()),
        tap(() => this.messageService.showSuccessMessage('Flight route saved successfully.'))
    ));



    saveFlightrouteError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_SAVE_ERROR),
        tap((action: FlightrouteSaveErrorAction) => {
            this.messageService.showErrorMessage('Error while saving flight route.', action.error);
        })
    ), { dispatch: false});



    deleteFlightroute$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_DELETE),
        map((action: FlightrouteDeleteAction) => action.flightrouteId),
        withLatestFrom(this.currentUser$),
        filter(([flightrouteId, currentUser]) => flightrouteId > 0 && currentUser !== undefined),
        switchMap(([flightrouteId, currentUser]) => this.flightrouteService.deleteFlightroute(flightrouteId, currentUser).pipe(
            map(() => new FlightrouteDeleteSuccessAction()),
            catchError(error => of(new FlightrouteDeleteErrorAction(error)))
        ))
    ));



    deleteFlightrouteSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_DELETE_SUCCESS),
        map(() => new FlightrouteReadListAction()),
        tap(() => this.messageService.showSuccessMessage('Flight route deleted successfully.'))
    ));



    deleteFlightrouteError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_DELETE_ERROR),
        tap((action: FlightrouteDeleteErrorAction) => {
            this.messageService.showErrorMessage('Error deleting flight route', action.error);
        })
    ), { dispatch: false});
}
