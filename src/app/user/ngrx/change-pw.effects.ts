import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ChangePwAction, ChangePwErrorAction, ChangePwSuccessAction, UserActionTypes} from './user.actions';
import {MessageService} from '../../message/domain-service/message.service';
import {UserService} from '../domain-service/user.service';


@Injectable()
export class ChangePwEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly userService: UserService,
        private readonly messageService: MessageService
    ) {
    }



    changePw$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_CHANGE_PW),
        switchMap((action: ChangePwAction) => this.userService.updatePassword(action.token, action.oldPassword, action.newPassword).pipe(
            map(() => new ChangePwSuccessAction()),
            catchError(error => of(new ChangePwErrorAction(error)))
        ))
    ));



    changePwSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_CHANGE_PW_SUCCESS),
        tap(() => {
            this.messageService.showSuccessMessage('Password successfully changed!');
        })
    ), { dispatch: false });



    changePwError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_CHANGE_PW_ERROR),
        tap((action: ChangePwErrorAction) => {
            this.messageService.showErrorMessage('Error while changing password.', action.error);
        })
    ), { dispatch: false });
}
