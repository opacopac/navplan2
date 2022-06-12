import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AutoLoginUserSuccessAction, UserActionTypes} from './user.actions';
import {ClientstorageHelper} from '../../../system/domain/service/clientstorage/clientstorage-helper';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';


@Injectable()
export class LogoutEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
    ) {
    }



    logoutUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGOUT),
        tap(() => {
            this.clientStorageService.deletePersistedToken();
            this.router.navigate(['/map']);
        }),
        map((action: AutoLoginUserSuccessAction) => {
            return MessageActions.showMessage({
                message: Message.success('User successfully logged out!')
            });
        })
    ));
}
