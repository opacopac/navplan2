import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {
    ResetPwAction,
    ResetPwErrorAction,
    ResetPwSuccessAction,
    SendLostPwEmailAction,
    SendLostPwEmailErrorAction,
    SendLostPwEmailSuccessAction,
    UserActionTypes
} from './user.actions';
import {ClientstorageHelper} from '../../../system/domain/service/clientstorage/clientstorage-helper';
import {IUserService} from '../../domain/service/i-user.service';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';


@Injectable()
export class LostPwEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly userService: IUserService,
    ) {
    }


    // region send lost pw email - step 1

    sendLostPwEmail$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_LOST_PW_EMAIL),
        switchMap((action: SendLostPwEmailAction) => this.userService.sendLostPwEmail(action.email).pipe(
            map(email => new SendLostPwEmailSuccessAction(email)),
            catchError(error => of(new SendLostPwEmailErrorAction(error)))
        ))
    ));



    sendLostPwEmailSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_LOST_PW_EMAIL_SUCCESS),
        map((action: SendLostPwEmailSuccessAction) => {
            return MessageActions.showMessage({
                message: Message.success('Password recovery email successfully sent to ' + action.email + '!')
            });
        })
    ));



    sendLostPwEmailError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_LOST_PW_EMAIL_ERROR),
        map((action: SendLostPwEmailErrorAction) => {
            return MessageActions.showMessage({
                message: Message.error('Error while sending recovery email.', action.error)
            });
        })
    ));

    // endregion


    // region reset pw - step 2

    resetPw$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_RESET_PW),
        switchMap((action: ResetPwAction) => this.userService.resetPassword(action.token, action.newPassword, action.rememberMe).pipe(
            map((user) => new ResetPwSuccessAction(user, action.rememberMe)),
            catchError(error => of(new ResetPwErrorAction(error)))
        ))
    ));



    resetPwSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_RESET_PW_SUCCESS),
        tap((action: ResetPwSuccessAction) => {
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate(['/map']);
        }),
        map((action: ResetPwSuccessAction) => {
            return MessageActions.showMessage({
                message: Message.success('Password successfully changed!')
            });
        })
    ));



    resetPwError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_RESET_PW_ERROR),
        map((action: ResetPwErrorAction) => {
            return MessageActions.showMessage({
                message: Message.error('Error while changing password.', action.error)
            });
        })
    ));

    // endregion
}
