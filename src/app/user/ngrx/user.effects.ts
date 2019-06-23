import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
    AutoLoginUserAction,
    AutoLoginUserErrorAction,
    AutoLoginUserSuccessAction,
    ChangePwAction,
    ChangePwErrorAction,
    ChangePwSuccessAction,
    LoginUserAction,
    LoginUserErrorAction,
    LoginUserSuccessAction,
    RegisterUserAction,
    RegisterUserErrorAction,
    RegisterUserSuccessAction,
    UserActionTypes,
    SendRegisterEmailAction,
    SendRegisterEmailErrorAction,
    SendRegisterEmailSuccessAction,
    SendLostPwEmailErrorAction,
    SendLostPwEmailSuccessAction,
    SendLostPwEmailAction,
    ResetPwErrorAction, ResetPwSuccessAction, ResetPwAction
} from './user.actions';
import {UserService} from '../rest/user.service';
import {MessageService} from '../../message/services/message.service';
import {ClientstorageService} from '../../shared/services/clientstorage/clientstorage.service';


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private userService: UserService,
        private clientStorageService: ClientstorageService,
        private messageService: MessageService) {
    }


    // region auto login

    @Effect()
    autoLoginUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_AUTOLOGIN),
        switchMap((action: AutoLoginUserAction) => this.userService.autoLogin(action.token).pipe(
            map(user => new AutoLoginUserSuccessAction(user)),
            catchError(error => of(new AutoLoginUserErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    autoLoginUserSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_AUTOLOGIN_SUCCESS),
        tap((action: AutoLoginUserSuccessAction) => {
            this.messageService.writeSuccessMessage('Welcome ' + action.user.email + '!');
            this.router.navigate(['/map']);
        })
    );


    @Effect({ dispatch: false })
    autoLoginUserError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_AUTOLOGIN_ERROR),
        tap((action: AutoLoginUserErrorAction) => {
            console.error(action.error);
            this.clientStorageService.deletePersistedToken();
        })
    );

    // endregion


    // region login

    @Effect()
    loginUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGIN),
        switchMap((action: LoginUserAction) => this.userService.login(action.email, action.password, action.rememberMe).pipe(
            map(user => new LoginUserSuccessAction(user, action.rememberMe)),
            catchError(error => of(new LoginUserErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    loginUserSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGIN_SUCCESS),
        tap((action: LoginUserSuccessAction) => {
            this.messageService.writeSuccessMessage('Welcome ' + action.user.email + '!');
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate(['/map']);
        })
    );


    @Effect({ dispatch: false })
    loginUserError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGIN_ERROR),
        tap((action: LoginUserErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
            this.clientStorageService.deletePersistedToken();
        })
    );

    // endregion


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
            this.messageService.writeSuccessMessage('Verification email successfully sent to ' + action.email + '!');
        })
    );


    @Effect({ dispatch: false })
    sendRegisterEmailError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_REGISTER_EMAIL_ERROR),
        tap((action: SendRegisterEmailErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        })
    );

    // endregion


    // region registration - step 2

    @Effect()
    registerUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_REGISTER),
        switchMap((action: RegisterUserAction) => this.userService.register(action.token, action.password, action.rememberMe).pipe(
            map((user) => new RegisterUserSuccessAction(user, action.rememberMe)),
            catchError(error => of(new RegisterUserErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    registerUserSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_REGISTER_SUCCESS),
        tap((action: RegisterUserSuccessAction) => {
            this.messageService.writeSuccessMessage('Welcome ' + action.user.email + '!');
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate(['/map']);
        })
    );


    @Effect({ dispatch: false })
    registerUserError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_REGISTER_ERROR),
        tap((action: RegisterUserErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        })
    );

    // endregion


    // region lost pw - step 1

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
            this.messageService.writeSuccessMessage('Password recovery email successfully sent to ' + action.email + '!');
        })
    );


    @Effect({ dispatch: false })
    sendLostPwEmailError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_LOST_PW_EMAIL_ERROR),
        tap((action: SendLostPwEmailErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        })
    );

    // endregion


    // region lost pw - step 2

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
            this.messageService.writeSuccessMessage('Password successfully changed!');
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate(['/map']);
        })
    );


    @Effect({ dispatch: false })
    resetPwError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_RESET_PW_ERROR),
        tap((action: ResetPwErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        })
    );

    // endregion


    // region change password

    @Effect()
    changePw$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_CHANGE_PW),
        switchMap((action: ChangePwAction) => this.userService.updatePassword(action.token, action.oldPassword, action.newPassword).pipe(
            map(() => new ChangePwSuccessAction()),
            catchError(error => of(new ChangePwErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    changePwSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_CHANGE_PW_SUCCESS),
        tap((action: ChangePwSuccessAction) => {
            this.messageService.writeSuccessMessage('Password successfully changed!');
        })
    );


    @Effect({ dispatch: false })
    changePwError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_CHANGE_PW_ERROR),
        tap((action: ChangePwErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
        })
    );

    // endregion


    // region logout

    @Effect({ dispatch: false })
    logoutUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGOUT),
        tap(() => {
            this.clientStorageService.deletePersistedToken();
            this.messageService.writeSuccessMessage('User successfully logged out!');
            this.router.navigate(['/map']);
        })
    );

    // endregion
}
