import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
    UserActionTypes,
    SendLostPwEmailErrorAction,
    SendLostPwEmailSuccessAction,
    SendLostPwEmailAction,
    ResetPwErrorAction, ResetPwSuccessAction, ResetPwAction
} from './user.actions';
import {ClientstorageHelper} from '../../system/use-case/clientstorage/clientstorage-helper';
import {UserService} from '../rest/user.service';
import {MessageService} from '../../message/services/message.service';


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

    @Effect()
    sendLostPwEmail$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_LOST_PW_EMAIL),
        switchMap((action: SendLostPwEmailAction) => this.userService.sendLostPwEmail(action.email).pipe(
            map(email => new SendLostPwEmailSuccessAction(email)),
            catchError(error => of(new SendLostPwEmailErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    sendLostPwEmailSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_LOST_PW_EMAIL_SUCCESS),
        tap((action: SendLostPwEmailSuccessAction) => {
            this.messageService.showSuccessMessage('Password recovery email successfully sent to ' + action.email + '!');
        })
    );


    @Effect({ dispatch: false })
    sendLostPwEmailError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_LOST_PW_EMAIL_ERROR),
        tap((action: SendLostPwEmailErrorAction) => {
            this.messageService.showErrorMessage('Error while sending recovery email.', action.error);
        })
    );

    // endregion


    // region reset pw - step 2

    @Effect()
    resetPw$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_RESET_PW),
        switchMap((action: ResetPwAction) => this.userService.resetPassword(action.token, action.newPassword, action.rememberMe).pipe(
            map((user) => new ResetPwSuccessAction(user, action.rememberMe)),
            catchError(error => of(new ResetPwErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    resetPwSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_RESET_PW_SUCCESS),
        tap((action: ResetPwSuccessAction) => {
            this.messageService.showSuccessMessage('Password successfully changed!');
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate(['/map']);
        })
    );


    @Effect({ dispatch: false })
    resetPwError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_RESET_PW_ERROR),
        tap((action: ResetPwErrorAction) => {
            this.messageService.showErrorMessage('Error while changing password.', action.error);
        })
    );

    // endregion
}
