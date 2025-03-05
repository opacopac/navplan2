import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ClientstorageHelper} from '../../../system/domain/service/clientstorage/clientstorage-helper';
import {LoginEffects} from './login.effects';
import {IUserService} from '../../domain/service/i-user.service';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {AutoLoginActions} from './auto-login.actions';


@Injectable()
export class AutoLoginEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly userService: IUserService,
    ) {
    }


    autoLoginUser$ = createEffect(() => this.actions$.pipe(
        ofType(AutoLoginActions.userAutoLogin),
        switchMap(action => this.userService.autoLogin().pipe(
            map(user => AutoLoginActions.userAutoLoginSuccess({user: user})),
            catchError(error => of(AutoLoginActions.userAutoLoginError({error: error})))
        ))
    ));


    autoLoginUserSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AutoLoginActions.userAutoLoginSuccess),
        tap(action => {
            this.router.navigate([LoginEffects.ROUTE_URL_MAP]);
        }),
        map(action => MessageActions.showMessage({
            message: Message.success('Welcome ' + action.user.email + '!')
        }))
    ));


    autoLoginUserError$ = createEffect(() => this.actions$.pipe(
        ofType(AutoLoginActions.userAutoLoginError),
        tap(action => {
            this.clientStorageService.deletePersistedToken();
        })
    ), {dispatch: false});
}
