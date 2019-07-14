import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
    LoginUserAction,
    LoginUserErrorAction,
    LoginUserSuccessAction,
    UserActionTypes,
} from './user.actions';
import {ClientstorageHelper} from '../../system/use-case/clientstorage/clientstorage-helper';
import {UserService} from '../rest/user.service';
import {MessageService} from '../../message/services/message.service';


@Injectable()
export class LoginEffects {
    public static readonly ROUTE_URL_MAP = '/map';


    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly userService: UserService,
        private messageService: MessageService
    ) {
    }


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
            this.messageService.showSuccessMessage('Welcome ' + action.user.email + '!');
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate([LoginEffects.ROUTE_URL_MAP]);
        })
    );


    @Effect({ dispatch: false })
    loginUserError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGIN_ERROR),
        tap((action: LoginUserErrorAction) => {
            this.messageService.showErrorMessage('Error while logging in.', action.error);
            this.clientStorageService.deletePersistedToken();
        })
    );
}
