import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ChangePwAction, ChangePwErrorAction, ChangePwSuccessAction, UserActionTypes} from './user.actions';
import {UserService} from '../domain-service/user.service';
import {MessageActions} from '../../message/ngrx/message.actions';
import {Message} from '../../message/domain-model/message';


@Injectable()
export class ChangePwEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly userService: UserService,
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
        map((action: ChangePwErrorAction) => {
            return MessageActions.showMessage({
                message: Message.success('Password successfully changed!')
            });
        })
    ));


    changePwError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_CHANGE_PW_ERROR),
        map((action: ChangePwErrorAction) => {
            return MessageActions.showMessage({
                message: Message.error('Error while changing password.', action.error)
            });
        })
    ));
}
