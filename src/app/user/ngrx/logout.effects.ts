import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserActionTypes} from './user.actions';
import {ClientstorageHelper} from '../../system/use-case/clientstorage/clientstorage-helper';
import {MessageService} from '../../message/services/message.service';


@Injectable()
export class LogoutEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly messageService: MessageService
    ) {
    }


    
    logoutUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_LOGOUT),
        tap(() => {
            this.clientStorageService.deletePersistedToken();
            this.messageService.showSuccessMessage('User successfully logged out!');
            this.router.navigate(['/map']);
        })
    ), { dispatch: false });
}
