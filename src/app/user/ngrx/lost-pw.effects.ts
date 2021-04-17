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
import {ClientstorageHelper} from '../../system/domain-service/clientstorage/clientstorage-helper';
import {MessageService} from '../../message/domain-service/message.service';
import {UserService} from '../domain-service/user.service';


@Injectable()
export class LostPwEffects {


    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly userService: UserService,
        private readonly messageService: MessageService
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
        tap((action: SendLostPwEmailSuccessAction) => {
            this.messageService.showSuccessMessage('Password recovery email successfully sent to ' + action.email + '!');
        })
    ), { dispatch: false });



    sendLostPwEmailError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_LOST_PW_EMAIL_ERROR),
        tap((action: SendLostPwEmailErrorAction) => {
            this.messageService.showErrorMessage('Error while sending recovery email.', action.error);
        })
    ), { dispatch: false });

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
            this.messageService.showSuccessMessage('Password successfully changed!');
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate(['/map']);
        })
    ), { dispatch: false });



    resetPwError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_RESET_PW_ERROR),
        tap((action: ResetPwErrorAction) => {
            this.messageService.showErrorMessage('Error while changing password.', action.error);
        })
    ), { dispatch: false });

    // endregion
}
