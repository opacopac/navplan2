import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ChangePwAction, ChangePwErrorAction, ChangePwSuccessAction, UserActionTypes} from './user.actions';
import {UserService} from '../rest/user.service';
import {MessageService} from '../../message/services/message.service';


@Injectable()
export class ChangePwEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly userService: UserService,
        private readonly messageService: MessageService
    ) {
    }


    @Effect()
    changePw$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_CHANGE_PW),
        switchMap((action: ChangePwAction) => this.userService.updatePassword(action.token, action.oldPassword, action.newPassword).pipe(
            map(() => new ChangePwSuccessAction()),
            catchError(error => of(new ChangePwErrorAction(error)))
        ))
    );


    @Effect({ dispatch: false })
    changePwSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_CHANGE_PW_SUCCESS),
        tap(() => {
            this.messageService.showSuccessMessage('Password successfully changed!');
        })
    );


    @Effect({ dispatch: false })
    changePwError$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.USER_CHANGE_PW_ERROR),
        tap((action: ChangePwErrorAction) => {
            this.messageService.showErrorMessage('Error while changing password.', action.error);
        })
    );
}
