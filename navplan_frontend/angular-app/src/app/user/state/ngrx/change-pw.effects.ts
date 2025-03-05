import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {IUserService} from '../../domain/service/i-user.service';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {ChangePwActions} from './change-pw.actions';


@Injectable()
export class ChangePwEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly userService: IUserService,
    ) {
    }


    changePw$ = createEffect(() => this.actions$.pipe(
        ofType(ChangePwActions.userChangePw),
        switchMap(action => this.userService.updatePassword(action.oldPassword, action.newPassword).pipe(
            map(() => ChangePwActions.userChangePwSuccess()),
            catchError(error => of(ChangePwActions.userChangePwError({error: error})))
        ))
    ));


    changePwSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(ChangePwActions.userChangePwSuccess),
        map(action => MessageActions.showMessage({
            message: Message.success('Password successfully changed!')
        }))
    ));


    changePwError$ = createEffect(() => this.actions$.pipe(
        ofType(ChangePwActions.userChangePwError),
        map(action => MessageActions.showMessage({
            message: Message.error('Error while changing password.', action.error)
        }))
    ));
}
