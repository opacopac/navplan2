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
import {ClientstorageHelper} from '../../system/use-case/clientstorage/clientstorage-helper';
import {UserService} from '../rest/user.service';
import {MessageService} from '../../message/services/message.service';
import {LoginEffects} from './login.effects';


@Injectable()
export class AutoLoginEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly userService: UserService,
        private messageService: MessageService
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
            this.messageService.showSuccessMessage('Welcome ' + action.user.email + '!');
            this.router.navigate([LoginEffects.ROUTE_URL_MAP]);
        })
    ), { dispatch: false });



    autoLoginUserError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_AUTOLOGIN_ERROR),
        tap((action: AutoLoginUserErrorAction) => {
            this.clientStorageService.deletePersistedToken();
        })
    ), { dispatch: false });
}
