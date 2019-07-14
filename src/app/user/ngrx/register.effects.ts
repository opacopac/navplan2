import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
    RegisterUserAction,
    RegisterUserErrorAction,
    RegisterUserSuccessAction,
    UserActionTypes,
    SendRegisterEmailAction,
    SendRegisterEmailErrorAction,
    SendRegisterEmailSuccessAction,
} from './user.actions';
import {ClientstorageHelper} from '../../system/use-case/clientstorage/clientstorage-helper';
import {UserService} from '../rest/user.service';
import {MessageService} from '../../message/services/message.service';


@Injectable()
export class RegisterEffects {


    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly userService: UserService,
        private readonly messageService: MessageService
    ) {
    }


    // region registration - step 1

    @Effect()
    sendRegisterEmail$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_REGISTER_EMAIL),
        switchMap((action: SendRegisterEmailAction) => this.userService.sendRegisterEmail(action.email).pipe(
            map(email => new SendRegisterEmailSuccessAction(email)),
            catchError(error => of(new SendRegisterEmailErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    sendRegisterEmailSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_REGISTER_EMAIL_SUCCESS),
        tap((action: SendRegisterEmailSuccessAction) => {
            this.messageService.showSuccessMessage('Verification email successfully sent to ' + action.email + '!');
        })
    );


    @Effect({ dispatch: false })
    sendRegisterEmailError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_REGISTER_EMAIL_ERROR),
        tap((action: SendRegisterEmailErrorAction) => {
            this.messageService.showErrorMessage('Error while sending verification email.', action.error);
        })
    );

    // endregion


    // region registration - step 2

    @Effect()
    registerUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_REGISTER),
        mergeMap((action: RegisterUserAction) => this.userService.register(action.token, action.password, action.rememberMe).pipe(
            map((user) => new RegisterUserSuccessAction(user, action.rememberMe)),
            catchError(error => of(new RegisterUserErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    registerUserSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_REGISTER_SUCCESS),
        tap((action: RegisterUserSuccessAction) => {
            this.messageService.showSuccessMessage('Welcome ' + action.user.email + '!');
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate(['/map']);
        })
    );


    @Effect({ dispatch: false })
    registerUserError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_REGISTER_ERROR),
        tap((action: RegisterUserErrorAction) => {
            this.messageService.showErrorMessage('Error during registration.', action.error);
        })
    );

    // endregion
}
