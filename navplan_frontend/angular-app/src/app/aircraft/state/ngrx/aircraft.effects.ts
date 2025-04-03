import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {UserState} from '../../../user/state/state-model/user-state';
import {getCurrentUser, getUserState} from '../../../user/state/ngrx/user.selectors';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {IAircraftService} from '../../domain/service/i-aircraft.service';
import {AircraftListActions} from './aircraft-list.actions';
import {AircraftState} from '../state-model/aircraft-state';
import {getAircraftState} from './aircraft.selectors';
import {AircraftCrudActions} from './aircraft-crud.actions';
import {Router} from '@angular/router';
import {User} from '../../../user/domain/model/user';


@Injectable()
export class AircraftEffects {
    private readonly aircraftState$: Observable<AircraftState> = this.appStore.select(getAircraftState);
    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));


    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly appStore: Store<any>,
        private readonly aircraftService: IAircraftService
    ) {
    }


    readAircraftListAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftListActions.readList),
        withLatestFrom(this.currentUser$),
        switchMap(([action, currentUser]) => {
            if (currentUser) {
                return this.aircraftService.readAircraftList().pipe(
                    map(aircraftList => AircraftListActions.readListSuccessful({aircraftList: aircraftList})),
                    catchError(error => of(MessageActions.showMessage({
                        message: Message.error('Error reading aircraft list: ', error)
                    })))
                );
            } else {
                return of(AircraftListActions.readListSuccessful({aircraftList: []}));
            }
        })
    ));

    createNewAircraftAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftCrudActions.createNewAircraft),
        switchMap(action => [
            AircraftCrudActions.saveAircraft(),
            AircraftListActions.readList(),
        ])
    ));

    selectAircraftAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftListActions.selectAircraft),
        switchMap((action) => this.aircraftService.readAircraft(action.aircraftId).pipe(
            switchMap(aircraft => [
                AircraftListActions.selectAircraftSuccess({aircraft: aircraft}),
                MessageActions.showMessage({
                    message: Message.success('Aircraft ' + aircraft.registration + ' selected.')
                })
            ]),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error selecting aircraft: ', error)
            })))
        ))
    ));

    editAircraftAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftListActions.editAircraft),
        switchMap((action) => this.aircraftService.readAircraft(action.aircraftId).pipe(
            switchMap(aircraft => [
                AircraftListActions.selectAircraftSuccess({aircraft: aircraft}),
                MessageActions.showMessage({
                    message: Message.success('Aircraft ' + aircraft.registration + ' selected.')
                })
            ]),
            tap(() => this.router.navigate(['/aircraft/aircraft'])),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error edit aircraft: ', error)
            })))
        ))
    ));

    saveAircraftAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftCrudActions.saveAircraft),
        withLatestFrom(this.aircraftState$),
        switchMap(([action, aircraftState]) => this.aircraftService.saveAircraft(aircraftState.currentAircraft).pipe(
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
        switchMap((action) => this.aircraftService.duplicateAircraft(action.aircraftId).pipe(
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
        switchMap((action) => this.aircraftService.deleteAircraft(action.aircraftId).pipe(
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
