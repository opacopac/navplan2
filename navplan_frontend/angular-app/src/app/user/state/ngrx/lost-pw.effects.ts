import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ClientstorageHelper} from '../../../system/domain/service/clientstorage/clientstorage-helper';
import {IUserService} from '../../domain/service/i-user.service';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {LostPwActions} from './lost-pw.actions';


@Injectable()
export class LostPwEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly userService: IUserService,
    ) {
    }


    // region send lost pw email - step 1

    sendLostPwEmail$ = createEffect(() => this.actions$.pipe(
        ofType(LostPwActions.sendLostPwEmail),
        switchMap(action => this.userService.sendLostPwEmail(action.email).pipe(
            map(email => LostPwActions.sendLostPwEmailSuccess({email: email})),
            catchError(error => of(LostPwActions.sendLostPwEmailError({error: error})))
        ))
    ));


    sendLostPwEmailSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(LostPwActions.sendLostPwEmailSuccess),
        map(action => MessageActions.showMessage({
            message: Message.success('Password recovery email successfully sent to ' + action.email + '!')
        }))
    ));


    sendLostPwEmailError$ = createEffect(() => this.actions$.pipe(
        ofType(LostPwActions.sendLostPwEmailError),
        map(action => MessageActions.showMessage({
            message: Message.error('Error while sending recovery email.', action.error)
        }))
    ));

    // endregion


    // region reset pw - step 2

    resetPw$ = createEffect(() => this.actions$.pipe(
        ofType(LostPwActions.userResetPw),
        switchMap(action => this.userService.resetPassword(action.token, action.newPassword, action.rememberMe).pipe(
            map((user) => LostPwActions.userResetPwSuccess({user: user, rememberMe: action.rememberMe})),
            catchError(error => of(LostPwActions.userResetPwError({error: error})))
        ))
    ));


    resetPwSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(LostPwActions.userResetPwSuccess),
        tap(action => {
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate(['/map']);
        }),
        map(action => MessageActions.showMessage({
            message: Message.success('Password successfully changed!')
        }))
    ));


    resetPwError$ = createEffect(() => this.actions$.pipe(
        ofType(LostPwActions.userResetPwError),
        map(action => MessageActions.showMessage({
            message: Message.error('Error while changing password.', action.error)
        }))
    ));

    // endregion
}
