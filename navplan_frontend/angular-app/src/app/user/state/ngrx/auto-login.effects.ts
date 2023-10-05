import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {
    AutoLoginUserAction,
    AutoLoginUserErrorAction,
    AutoLoginUserSuccessAction,
    UserActionTypes
} from './user.actions';
import {ClientstorageHelper} from '../../../system/domain/service/clientstorage/clientstorage-helper';
import {LoginEffects} from './login.effects';
import {IUserService} from '../../domain/service/i-user.service';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';


@Injectable()
export class AutoLoginEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly userService: IUserService,
    ) {
    }



    autoLoginUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_AUTOLOGIN),
        switchMap((action: AutoLoginUserAction) => this.userService.autoLogin(action.token).pipe(
            map(user => new AutoLoginUserSuccessAction(user)),
            catchError(error => of(new AutoLoginUserErrorAction(error)))
        ))
    ));



    autoLoginUserSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_AUTOLOGIN_SUCCESS),
        map(action => action as AutoLoginUserSuccessAction),
        tap((action: AutoLoginUserSuccessAction) => {
            this.router.navigate([LoginEffects.ROUTE_URL_MAP]);
        }),
        map((action: AutoLoginUserSuccessAction) => {
            return MessageActions.showMessage({
                message: Message.success('Welcome ' + action.user.email + '!')
            });
        })
    ));



    autoLoginUserError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_AUTOLOGIN_ERROR),
        tap((action: AutoLoginUserErrorAction) => {
            this.clientStorageService.deletePersistedToken();
        })
    ), { dispatch: false });
}
