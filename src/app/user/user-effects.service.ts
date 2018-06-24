import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
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
import {UserService} from '../services/user/user.service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {MessageService} from '../services/utils/message.service';
import {ClientstorageService} from '../services/session/clientstorage.service';


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
    autoLoginUser$: Observable<Action> = this.actions$.ofType(UserActionTypes.USER_AUTOLOGIN)
        .switchMap((action: AutoLoginUserAction) => this.userService.reLogin(action.email, action.token)
            .map(user => new LoginUserSuccessAction(user, true))
            .catch(error => Observable.of(new LoginUserErrorAction(error.message)))
        );


    @Effect()
    loginUser$: Observable<Action> = this.actions$.ofType(UserActionTypes.USER_LOGIN)
        .switchMap((action: LoginUserAction) => this.userService.login(action.email, action.password)
            .map(user => new LoginUserSuccessAction(user, action.remember))
            .catch(error => Observable.of(new LoginUserErrorAction(error.message)))
        );


    @Effect({ dispatch: false })
    loginUserSuccess$: Observable<Action> = this.actions$.ofType(UserActionTypes.USER_LOGIN_SUCCESS)
        .flatMap((action: LoginUserSuccessAction) => {
            this.messageService.writeSuccessMessage('Welcome ' + action.user.email + '!');
            this.clientStorageService.persistUser(action.user, action.remember);
            this.router.navigate(['/map']);
            return Observable.of(undefined);
        });


    @Effect({ dispatch: false })
    loginUserError$: Observable<Action> = this.actions$.ofType(UserActionTypes.USER_LOGIN_ERROR)
        .flatMap((action: LoginUserErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
            this.clientStorageService.deletePersistedUser();
            return Observable.of(undefined);
        });

    // endregion


    // region logout

    @Effect()
    logoutUser$: Observable<Action> = this.actions$.ofType(UserActionTypes.USER_LOGOUT)
        .switchMap((action: LogoutUserAction) => this.userService.logout(action.email, action.token)
            .map(() => new LogoutUserSuccessAction())
            .catch(error => Observable.of(new LogoutUserErrorAction(error.message)))
        );


    @Effect({ dispatch: false })
    logoutUserSuccess$: Observable<Action> = this.actions$.ofType(UserActionTypes.USER_LOGOUT_SUCCESS)
        .flatMap(() => {
            this.messageService.writeSuccessMessage('User successfully logged out!');
            this.clientStorageService.deletePersistedUser();
            this.router.navigate(['/map']);
            return Observable.of(undefined);
        });


    @Effect({ dispatch: false })
    logoutUserError$: Observable<Action> = this.actions$.ofType(UserActionTypes.USER_LOGOUT_ERROR)
        .flatMap((action: LogoutUserErrorAction) => {
            this.messageService.writeErrorMessage(action.error);
            this.clientStorageService.deletePersistedUser();
            return Observable.of(undefined);
        });

    // endregion
}
