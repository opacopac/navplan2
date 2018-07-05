import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import 'rxjs/add/operator/do';
import {
    AutoLoginUserAction,
    LoginUserAction,
    LoginUserErrorAction,
    LoginUserSuccessAction,
    LogoutUserAction,
    LogoutUserErrorAction,
    LogoutUserSuccessAction,
    UserActionTypes
} from './user.actions';
import {UserService} from './services/user/user.service';
import {MessageService} from '../core/services/utils/message.service';
import {ClientstorageService} from '../core/services/session/clientstorage.service';


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
        switchMap((action: AutoLoginUserAction) => this.userService.reLogin(action.email, action.token).pipe(
            map(user => new LoginUserSuccessAction(user, true)),
            catchError(error => Observable.of(new LoginUserErrorAction(error.message)))
        ))
    );


    @Effect()
    loginUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGIN),
        switchMap((action: LoginUserAction) => this.userService.login(action.email, action.password).pipe(
            map(user => new LoginUserSuccessAction(user, action.remember)),
            catchError(error => Observable.of(new LoginUserErrorAction(error.message)))
        ))
    );


    @Effect({ dispatch: false })
    loginUserSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGIN_SUCCESS)
    )
        .do((action: LoginUserSuccessAction) => {
            this.messageService.writeSuccessMessage('Welcome ' + action.user.email + '!');
            this.clientStorageService.persistUser(action.user, action.remember);
            this.router.navigate(['/map']);
        });


    @Effect({ dispatch: false })
    loginUserError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGIN_ERROR)
    )
        .do((action: LoginUserErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
            this.clientStorageService.deletePersistedUser();
        });

    // endregion


    // region logout

    @Effect()
    logoutUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGOUT),
        switchMap((action: LogoutUserAction) => this.userService.logout(action.email, action.token).pipe(
            map(() => new LogoutUserSuccessAction()),
            catchError(error => Observable.of(new LogoutUserErrorAction(error.message)))
        ))
    );


    @Effect({ dispatch: false })
    logoutUserSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGOUT_SUCCESS)
    )
        .do(() => {
            this.messageService.writeSuccessMessage('User successfully logged out!');
            this.clientStorageService.deletePersistedUser();
            this.router.navigate(['/map']);
        });


    @Effect({ dispatch: false })
    logoutUserError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGOUT_ERROR)
    )
        .do((action: LogoutUserErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
            this.clientStorageService.deletePersistedUser();
        });

    // endregion
}
