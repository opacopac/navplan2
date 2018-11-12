import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {MessageService} from '../shared/services/message/message.service';
import {FlightrouteService} from './services/flightroute/flightroute.service';
import {
    FlightrouteActionTypes,
    FlightrouteReadListAction,
    FlightrouteReadListErrorAction,
    FlightrouteReadListSuccessAction,
    FlightrouteSaveSuccessAction,
    FlightrouteSaveErrorAction,
    FlightrouteDeleteAction,
    FlightrouteDeleteSuccessAction,
    FlightrouteDeleteErrorAction,
    FlightrouteReadAction,
    FlightrouteReadSuccessAction,
    FlightrouteReadErrorAction,
    SharedFlightrouteReadAction,
    SharedFlightrouteReadSuccessAction,
    SharedFlightrouteReadErrorAction,
    SharedFlightrouteCreateSuccessAction,
    SharedFlightrouteCreateErrorAction, RouteLineModifiedAction, InsertWaypointAction, ReplaceWaypointAction
} from './flightroute.actions';
import {getCurrentUser} from '../user/user.selectors';
import {User} from '../user/model/user';
import {getFlightroute} from './flightroute.selectors';
import {Flightroute} from './model/flightroute';
import {MapfeaturesService} from '../map-features/services/mapfeatures.service';
import {WaypointFactory} from './model/waypoint-mapper/waypoint-factory';
import {getMapFeatures} from '../map-features/map-features.selectors';
import {Mapfeatures} from '../map-features/model/mapfeatures';


@Injectable()
export class FlightrouteEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private flightrouteService: FlightrouteService,
        private mapFeaturesService: MapfeaturesService,
        private messageService: MessageService) {
    }


    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));
    private flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));
    private mapFeatures$: Observable<Mapfeatures> = this.appStore.pipe(select(getMapFeatures));


    // region flightroute list

    @Effect()
    readFlightrouteList$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_LIST_READ),
        switchMap(action => this.currentUser$),
        filter(currentUser => currentUser !== undefined),
        switchMap(currentUser => this.flightrouteService.readFlightrouteList(currentUser).pipe(
            map(routeList => new FlightrouteReadListSuccessAction(routeList)),
            catchError(error => of(new FlightrouteReadListErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false})
    readFlightrouteListError$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_LIST_READ_ERROR),
        tap((action: FlightrouteReadListErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        })
    );

    // endregion


    // region flightroute CRUD


    @Effect()
    readFlightroute$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_READ),
        map((action: FlightrouteReadAction) => action.flightrouteId),
        withLatestFrom(this.currentUser$),
        filter(([flightrouteId, currentUser]) => flightrouteId > 0 && currentUser !== undefined),
        switchMap(([flightrouteId, currentUser]) => this.flightrouteService.readFlightroute(flightrouteId, currentUser).pipe(
            map(route => new FlightrouteReadSuccessAction(route)),
            catchError(error => of(new FlightrouteReadErrorAction(error)))
        ))
);


    @Effect({ dispatch: false})
    readFlightrouteError$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_READ_ERROR),
        tap((action: FlightrouteReadErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        })
    );


    @Effect()
    createFlightroute$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_CREATE),
        switchMap(action => this.flightroute$),
        withLatestFrom(this.currentUser$),
        filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([flightroute, currentUser]) => this.flightrouteService.createFlightroute(flightroute, currentUser).pipe(
            map(route => new FlightrouteSaveSuccessAction(route)),
            catchError(error => of(new FlightrouteSaveErrorAction(error)))
        ))
    );


    @Effect()
    updateFlightroute$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_UPDATE),
        switchMap(action => this.flightroute$),
        withLatestFrom(this.currentUser$),
        filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([flightroute, currentUser]) => this.flightrouteService.updateFlightroute(flightroute, currentUser).pipe(
            map(route => new FlightrouteSaveSuccessAction(route)),
            catchError(error => of(new FlightrouteSaveErrorAction(error)))
        ))
    );


    @Effect()
    duplicateFlightroute$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_DUPLICATE),
        switchMap(action => this.flightroute$),
        withLatestFrom(this.currentUser$),
        filter(([flightroute, currentUser]) => flightroute !== undefined && currentUser !== undefined),
        switchMap(([flightroute, currentUser]) => this.flightrouteService.duplicateFlightroute(flightroute, currentUser).pipe(
            map(route => new FlightrouteSaveSuccessAction(route)),
            catchError(error => of(new FlightrouteSaveErrorAction(error)))
        ))
    );


    @Effect()
    saveFlightrouteSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_SAVE_SUCCESS),
        map((action: FlightrouteSaveSuccessAction) => new FlightrouteReadListAction()),
        tap(() => this.messageService.writeSuccessMessage('TODO'))
    );


    @Effect({ dispatch: false})
    saveFlightrouteError$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_SAVE_ERROR),
        tap((action: FlightrouteSaveErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        })
    );


    @Effect()
    deleteFlightroute$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_DELETE),
        map((action: FlightrouteDeleteAction) => action.flightrouteId),
        withLatestFrom(this.currentUser$),
        filter(([flightrouteId, currentUser]) => flightrouteId > 0 && currentUser !== undefined),
        switchMap(([flightrouteId, currentUser]) => this.flightrouteService.deleteFlightroute(flightrouteId, currentUser).pipe(
            map(() => new FlightrouteDeleteSuccessAction()),
            catchError(error => of(new FlightrouteDeleteErrorAction(error)))
        ))
    );


    @Effect()
    deleteFlightrouteSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_DELETE_SUCCESS),
        map((action: FlightrouteDeleteSuccessAction) => new FlightrouteReadListAction()),
        tap(() => this.messageService.writeSuccessMessage('TODO'))
    );


    @Effect({ dispatch: false})
    deleteFlightrouteError$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.FLIGHTROUTE_DELETE_ERROR),
        tap((action: FlightrouteDeleteErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        })
    );

    // endregion


    // region shared flightroute

    @Effect()
    readSharedFlightroute$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.SHARED_FLIGHTROUTE_READ),
        map((action: SharedFlightrouteReadAction) => action),
        filter(action => action.shareId !== undefined),
        switchMap(action => this.flightrouteService.readSharedFlightroute(action.shareId).pipe(
            map(route => new SharedFlightrouteReadSuccessAction(route)),
            catchError(error => of(new SharedFlightrouteReadErrorAction(error)))
        ))
    );


    @Effect()
    createSharedFlightroute$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.SHARED_FLIGHTROUTE_CREATE),
        switchMap(action => this.flightroute$),
        filter(flightroute => flightroute !== undefined),
        switchMap(flightroute => this.flightrouteService.createSharedFlightroute(flightroute).pipe(
            map(shareId => new SharedFlightrouteCreateSuccessAction(shareId)),
            catchError(error => of(new SharedFlightrouteCreateErrorAction(error)))
        ))
    );


    // endregion


    // region waypoint

    @Effect()
    modifyRouteLine$: Observable<Action> = this.actions$.pipe(
        ofType(FlightrouteActionTypes.WAYPOINTS_ROUTELINE_MODIFIED),
        map((action: RouteLineModifiedAction) => action),
        withLatestFrom(this.mapFeatures$),
        map(([action, mapFeatures]) => {
            const dataItem = MapfeaturesService.findLoadedMapFeatureByPosition(mapFeatures, action.newPosition);
            const wp = WaypointFactory.createNewWaypointFromDataItem(dataItem, action.newPosition);

            if (action.isNewWaypoint) {
                return new InsertWaypointAction(wp, action.index);
            } else {
                return new ReplaceWaypointAction(wp, action.index);
            }
        })
    );

    // endregion
}
