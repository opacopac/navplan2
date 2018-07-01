import 'rxjs-compat/add/operator/do';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {MessageService} from "../services/utils/message.service";
import {FlightrouteService} from "../services/flightroute/flightroute.service";
import {
    FlightrouteActionTypes,
    ReadFlightrouteListAction,
    ReadFlightrouteListErrorAction,
    ReadFlightrouteListSuccessAction,
    SaveFlightrouteSuccessAction,
    SaveFlightrouteErrorAction,
    DeleteFlightrouteAction,
    DeleteFlightrouteSuccessAction,
    DeleteFlightrouteErrorAction,
    ReadFlightrouteAction,
    ReadFlightrouteSuccessAction,
    ReadFlightrouteErrorAction,
    ReadSharedFlightrouteAction,
    ReadSharedFlightrouteSuccessAction,
    ReadSharedFlightrouteErrorAction,
    CreateSharedFlightrouteSuccessAction,
    CreateSharedFlightrouteErrorAction
} from "./flightroute.actions";
import {AppState} from "../app.state";
import {getCurrentUser} from "../user/user.selectors";
import {User} from "../user/model/user";
import {getFlightroute} from "./flightroute.selectors";
import {Flightroute} from "./model/flightroute";


@Injectable()
export class FlightrouteEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<AppState>,
        private flightrouteService: FlightrouteService,
        private messageService: MessageService) {
    }


    private currentUser$: Observable<User> = this.appStore.select(getCurrentUser);
    private flightroute$: Observable<Flightroute> = this.appStore.select(getFlightroute);


    // region flightroute list

    @Effect()
    readFlightrouteList$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_LIST_READ)
        .switchMap(action => this.currentUser$)
        .filter(currentUser => currentUser !== undefined)
        .switchMap(currentUser => this.flightrouteService.readFlightrouteList(currentUser)
            .map(routeList => new ReadFlightrouteListSuccessAction(routeList))
            .catch(error => Observable.of(new ReadFlightrouteListErrorAction(error)))
        );


    @Effect({ dispatch: false})
    readFlightrouteListError$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_LIST_READ_ERROR)
        .do((action: ReadFlightrouteListErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        });

    // endregion


    // region flightroute CRUD


    @Effect()
    readFlightroute$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_READ)
        .map((action: ReadFlightrouteAction) => action.flightrouteId)
        .withLatestFrom(this.currentUser$)
        .filter(([flightrouteId, currentUser]) => flightrouteId > 0 && currentUser !== undefined)
        .switchMap(([flightrouteId, currentUser]) => this.flightrouteService.readFlightroute(flightrouteId, currentUser)
            .map(route => new ReadFlightrouteSuccessAction(route))
            .catch(error => Observable.of(new ReadFlightrouteErrorAction(error)))
        );


    @Effect({ dispatch: false})
    readFlightrouteError$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_READ_ERROR)
        .do((action: ReadFlightrouteErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        });


    @Effect()
    createFlightroute$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_CREATE)
        .switchMap(action => this.flightroute$)
        .withLatestFrom(this.currentUser$)
        .filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined)
        .switchMap(([flightroute, currentUser]) => this.flightrouteService.createFlightroute(flightroute, currentUser)
            .map(route => new SaveFlightrouteSuccessAction(route))
            .catch(error => Observable.of(new SaveFlightrouteErrorAction(error)))
        );

    @Effect()
    updateFlightroute$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_UPDATE)
        .switchMap(action => this.flightroute$)
        .withLatestFrom(this.currentUser$)
        .filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined)
        .switchMap(([flightroute, currentUser]) => this.flightrouteService.updateFlightroute(flightroute, currentUser)
            .map(route => new SaveFlightrouteSuccessAction(route))
            .catch(error => Observable.of(new SaveFlightrouteErrorAction(error)))
        );

    @Effect()
    duplicateFlightroute$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_DUPLICATE)
        .switchMap(action => this.flightroute$)
        .withLatestFrom(this.currentUser$)
        .filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined)
        .switchMap(([flightroute, currentUser]) => this.flightrouteService.duplicateFlightroute(flightroute, currentUser)
            .map(route => new SaveFlightrouteSuccessAction(route))
            .catch(error => Observable.of(new SaveFlightrouteErrorAction(error)))
        );

    @Effect()
    saveFlightrouteSuccess$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_SAVE_SUCCESS)
        .do(() => this.messageService.writeSuccessMessage('TODO'))
        .map((action: SaveFlightrouteSuccessAction) => new ReadFlightrouteListAction());


    @Effect({ dispatch: false})
    saveFlightrouteError$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_SAVE_ERROR)
        .do((action: SaveFlightrouteErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        });


    @Effect()
    deleteFlightroute$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_DELETE)
        .map((action: DeleteFlightrouteAction) => action.flightrouteId)
        .withLatestFrom(this.currentUser$)
        .filter(([flightrouteId, currentUser]) => flightrouteId > 0 && currentUser !== undefined)
        .switchMap(([flightrouteId, currentUser]) => this.flightrouteService.deleteFlightroute(flightrouteId, currentUser)
            .map(() => new DeleteFlightrouteSuccessAction())
            .catch(error => Observable.of(new DeleteFlightrouteErrorAction(error)))
        );


    @Effect()
    deleteFlightrouteSuccess$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_DELETE_SUCCESS)
        .do(() => this.messageService.writeSuccessMessage('TODO'))
        .map((action: DeleteFlightrouteSuccessAction) => new ReadFlightrouteListAction());


    @Effect({ dispatch: false})
    deleteFlightrouteError$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_DELETE_ERROR)
        .do((action: DeleteFlightrouteErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        });

    // endregion


    // region shared flightroute

    @Effect()
    readSharedFlightroute$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_READ_SHARED)
        .map((action: ReadSharedFlightrouteAction) => action)
        .filter(action => action.shareId !== undefined)
        .switchMap(action => this.flightrouteService.readSharedFlightroute(action.shareId)
            .map(route => new ReadSharedFlightrouteSuccessAction(route))
            .catch(error => Observable.of(new ReadSharedFlightrouteErrorAction(error)))
        );


    @Effect()
    createSharedFlightroute$: Observable<Action> = this.actions$.ofType(FlightrouteActionTypes.FLIGHTROUTE_CREATE_SHARED)
        .switchMap(action => this.flightroute$)
        .filter(flightroute => flightroute !== undefined)
        .switchMap(flightroute => this.flightrouteService.createSharedFlightroute(flightroute)
            .map(shareId => new CreateSharedFlightrouteSuccessAction(shareId))
            .catch(error => Observable.of(new CreateSharedFlightrouteErrorAction(error)))
        );


    // endregion

}