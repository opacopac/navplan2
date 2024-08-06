import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {UserState} from '../../../user/state/state-model/user-state';
import {getUserState} from '../../../user/state/ngrx/user.selectors';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {IAircraftService} from '../../domain/service/i-aircraft.service';
import {AircraftListActions} from './aircraft-list.actions';
import {AircraftState} from '../state-model/aircraft-state';
import {getAircraftState} from './aircraft.selectors';
import {AircraftCrudActions} from './aircraft-crud-actions';
import {Router} from '@angular/router';


@Injectable()
export class AircraftEffects {
    private readonly aircraftState$: Observable<AircraftState> = this.appStore.select(getAircraftState);
    private readonly userState$: Observable<UserState> = this.appStore.select(getUserState);


    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly appStore: Store<any>,
        private readonly aircraftService: IAircraftService
    ) {
    }


    readAircraftListAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftListActions.readList),
        withLatestFrom(this.userState$),
        filter(([action, userState]) => userState.currentUser !== undefined),
        switchMap(([action, userState]) => this.aircraftService.readAircraftList(
            userState.currentUser
        ).pipe(
            map(aircraftList => AircraftListActions.showList({aircraftList: aircraftList})),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading aircraft list: ', error)
            })))
        ))
    ));

    readAircraftAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftListActions.selectAircraft),
        withLatestFrom(this.userState$),
        switchMap(([action, userState]) => this.aircraftService.readAircraft(
            action.aircraftId,
            userState.currentUser
        ).pipe(
            map(aircraft => AircraftListActions.selectAircraftSuccess({aircraft: aircraft})),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading aircraft: ', error)
            })))
        ))
    ));

    editAircraftAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftListActions.editAircraft),
        withLatestFrom(this.userState$),
        switchMap(([action, userState]) => this.aircraftService.readAircraft(
            action.aircraftId,
            userState.currentUser
        ).pipe(
            map(aircraft => AircraftListActions.selectAircraftSuccess({aircraft: aircraft})),
            tap(() => this.router.navigate(['/aircraft/aircraft'])),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading/edit aircraft: ', error)
            })))
        ))
    ));

    saveAircraftAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftCrudActions.saveAircraft),
        withLatestFrom(this.aircraftState$, this.userState$),
        switchMap(([action, aircraftState, userState]) => this.aircraftService.saveAircraft(
            aircraftState.currentAircraft,
            userState.currentUser
        ).pipe(
            switchMap(aircraft => [
                AircraftCrudActions.saveAircraftSuccess({aircraft: aircraft}),
                MessageActions.showMessage({
                    message: Message.success('Aircraft saved successfully.')
                })
            ]),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error saving aircraft: ', error)
            })))
        ))
    ));

    duplicateAircraftAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftCrudActions.duplicateAircraft),
        withLatestFrom(this.userState$),
        switchMap(([action, userState]) => this.aircraftService.duplicateAircraft(
            action.aircraftId,
            userState.currentUser
        ).pipe(
            switchMap(aircraft => [
                AircraftCrudActions.saveAircraftSuccess({aircraft: aircraft}),
                AircraftListActions.readList(),
                MessageActions.showMessage({
                    message: Message.success('Aircraft duplicated successfully.')
                })
            ]),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error duplicating aircraft: ', error)
            })))
        ))
    ));

    deleteAircraftAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftCrudActions.deleteAircraft),
        withLatestFrom(this.userState$),
        switchMap(([action, userState]) => this.aircraftService.deleteAircraft(
            action.aircraftId,
            userState.currentUser
        ).pipe(
            switchMap((success) => [
                AircraftCrudActions.deleteAircraftSuccess({aircraftId: action.aircraftId}),
                AircraftListActions.readList(),
                MessageActions.showMessage({
                    message: Message.success('Aircraft deleted successfully.')
                })
            ]),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error deleting aircraft: ', error)
            })))
        ))
    ));
}
