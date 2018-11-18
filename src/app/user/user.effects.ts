import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
    AutoLoginUserAction, AutoLoginUserSuccessAction,
    LoginUserAction,
    LoginUserErrorAction,
    LoginUserSuccessAction, RegisterUserAction, RegisterUserErrorAction, RegisterUserSuccessAction,
    UserActionTypes, VerifyEmailAction, VerifyEmailErrorAction, VerifyEmailSuccessAction
} from './user.actions';
import {UserService} from './services/user/user.service';
import {MessageService} from '../message/services/message/message.service';
import {ClientstorageService} from '../shared/services/clientstorage/clientstorage.service';


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private userService: UserService,
        private clientStorageService: ClientstorageService,
        private messageService: MessageService) {
    }


    // region login

    @Effect()
    autoLoginUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_AUTOLOGIN),
        switchMap((action: AutoLoginUserAction) => this.userService.autoLogin(action.token).pipe(
            map(user => new AutoLoginUserSuccessAction(user)),
            catchError(error => of(new LoginUserErrorAction(error)))
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
    verifyEmail$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_VERIFY_EMAIL),
        switchMap((action: VerifyEmailAction) => this.userService.verifyEmail(action.email).pipe(
            map(email => new VerifyEmailSuccessAction(email)),
            catchError(error => of(new VerifyEmailErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    verifyEmailSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_VERIFY_EMAIL_SUCCESS),
        tap((action: VerifyEmailSuccessAction) => {
            this.messageService.writeSuccessMessage('Verification email successfully sent to ' + action.email + '!');
        })
    );


    @Effect({ dispatch: false })
    verifyEmailError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_VERIFY_EMAIL_ERROR),
        tap((action: VerifyEmailErrorAction) => {
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
