import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {UserState} from '../../../user/state/state-model/user-state';
import {getUserState} from '../../../user/state/ngrx/user.selectors';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {IAircraftService} from '../../domain/service/i-aircraft.service';
import {AircraftActions} from './aircraft.actions';


@Injectable()
export class AircraftEffects {
    private readonly userState$: Observable<UserState> = this.appStore.select(getUserState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly aircraftService: IAircraftService
    ) {
    }


    readAircraftListAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftActions.readList),
        withLatestFrom(this.userState$),
        filter(([action, userState]) => userState.currentUser !== undefined),
        switchMap(([action, userState]) => this.aircraftService.readAircraftList(
            userState.currentUser
        ).pipe(
            map(aircraftList => AircraftActions.showList({aircraftList: aircraftList})),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading aircraft list: ', error)
            })))
        ))
    ));

    readAircraftAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftActions.selectAircraft),
        withLatestFrom(this.userState$),
        switchMap(([action, userState]) => this.aircraftService.readAircraft(
            action.aircraftId,
            userState.currentUser
        ).pipe(
            map(aircraft => AircraftActions.selectAircraftSuccess({aircraft: aircraft})),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading aircraft: ', error)
            })))
        ))
    ));
}
