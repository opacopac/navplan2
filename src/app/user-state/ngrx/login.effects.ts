import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {LoginUserAction, LoginUserErrorAction, LoginUserSuccessAction, UserActionTypes} from './user.actions';
import {ClientstorageHelper} from '../../system/domain-service/clientstorage/clientstorage-helper';
import {IUserService} from '../../user/domain-service/i-user.service';
import {MessageActions} from '../../message-state/ngrx/message.actions';
import {Message} from '../../message/domain-model/message';


@Injectable()
export class LoginEffects {
    public static readonly ROUTE_URL_MAP = '/map';


    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly userService: IUserService,
    ) {
    }



    loginUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGIN),
        switchMap((action: LoginUserAction) => this.userService.login(action.email, action.password, action.rememberMe).pipe(
            map(user => new LoginUserSuccessAction(user, action.rememberMe)),
            catchError(error => of(new LoginUserErrorAction(error)))
        ))
    ));



    loginUserSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGIN_SUCCESS),
        tap((action: LoginUserSuccessAction) => {
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate([LoginEffects.ROUTE_URL_MAP]);
        }),
        map((action: LoginUserSuccessAction) => {
            return MessageActions.showMessage({ message: Message.success('Welcome ' + action.user.email + '!') });
        })
    ));



    loginUserError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGIN_ERROR),
        tap((action: LoginUserErrorAction) => {
            this.clientStorageService.deletePersistedToken();
        }),
        map((action: LoginUserErrorAction) => {
            return MessageActions.showMessage({ message: Message.error('Error while logging in.', action.error) });
        }),
    ));
}
