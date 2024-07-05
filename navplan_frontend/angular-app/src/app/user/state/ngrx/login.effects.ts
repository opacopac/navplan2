import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ClientstorageHelper} from '../../../system/domain/service/clientstorage/clientstorage-helper';
import {IUserService} from '../../domain/service/i-user.service';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {LoginActions} from './login.actions';


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


    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(LoginActions.userLogin),
        switchMap(action => this.userService.login(action.email, action.password, action.rememberMe).pipe(
            map(user => LoginActions.userLoginSuccess({user: user, rememberMe: action.rememberMe})),
            catchError(error => of(LoginActions.userLoginError({error: error})))
        ))
    ));


    loginUserSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(LoginActions.userLoginSuccess),
        tap(action => {
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate([LoginEffects.ROUTE_URL_MAP]);
        }),
        map(action => MessageActions.showMessage(
            {message: Message.success('Welcome ' + action.user.email + '!')}
        ))
    ));


    loginUserError$ = createEffect(() => this.actions$.pipe(
        ofType(LoginActions.userLoginError),
        tap(action => this.clientStorageService.deletePersistedToken()),
        map(action => MessageActions.showMessage(
            {message: Message.error('Error while logging in.', action.error)}
        )),
    ));
}
