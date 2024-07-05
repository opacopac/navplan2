import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';
import {ClientstorageHelper} from '../../../system/domain/service/clientstorage/clientstorage-helper';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {LogoutActions} from './logout.actions';


@Injectable()
export class LogoutEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
    ) {
    }


    logoutUser$ = createEffect(() => this.actions$.pipe(
        ofType(LogoutActions.userLogout),
        tap(() => {
            this.clientStorageService.deletePersistedToken();
            this.router.navigate(['/map']);
        }),
        map(action => MessageActions.showMessage({
            message: Message.success('User successfully logged out!')
        }))
    ));
}
