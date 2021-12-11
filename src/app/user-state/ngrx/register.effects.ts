import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {
    RegisterUserAction,
    RegisterUserErrorAction,
    RegisterUserSuccessAction,
    SendRegisterEmailAction,
    SendRegisterEmailErrorAction,
    SendRegisterEmailSuccessAction,
    UserActionTypes,
} from './user.actions';
import {ClientstorageHelper} from '../../system/domain-service/clientstorage/clientstorage-helper';
import {IUserService} from '../../user/domain-service/i-user.service';
import {MessageActions} from '../../message-state/ngrx/message.actions';
import {Message} from '../../message/domain-model/message';


@Injectable()
export class RegisterEffects {


    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly clientStorageService: ClientstorageHelper,
        private readonly userService: IUserService,
    ) {
    }


    // region registration - step 1

    sendRegisterEmail$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_REGISTER_EMAIL),
        switchMap((action: SendRegisterEmailAction) => this.userService.sendRegisterEmail(action.email).pipe(
            map(email => new SendRegisterEmailSuccessAction(email)),
            catchError(error => of(new SendRegisterEmailErrorAction(error)))
        ))
    ));



    sendRegisterEmailSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_REGISTER_EMAIL_SUCCESS),
        map((action: SendRegisterEmailSuccessAction) => {
            return MessageActions.showMessage({
                message: Message.success('Verification email successfully sent to ' + action.email + '!')
            });
        })
    ));



    sendRegisterEmailError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_SEND_REGISTER_EMAIL_ERROR),
        map((action: SendRegisterEmailErrorAction) => {
            return MessageActions.showMessage({
                message: Message.error('Error while sending verification email.', action.error)
            });
        })
    ));

    // endregion


    // region registration - step 2

    registerUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_REGISTER),
        mergeMap((action: RegisterUserAction) => this.userService.register(action.token, action.password, action.rememberMe).pipe(
            map((user) => new RegisterUserSuccessAction(user, action.rememberMe)),
            catchError(error => of(new RegisterUserErrorAction(error)))
        ))
    ));



    registerUserSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_REGISTER_SUCCESS),
        tap((action: RegisterUserSuccessAction) => {
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate(['/map']);
        }),
        map((action: RegisterUserSuccessAction) => {
            return MessageActions.showMessage({
                message: Message.success('Welcome ' + action.user.email + '!')
            });
        })
    ));



    registerUserError$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(UserActionTypes.USER_REGISTER_ERROR),
        map((action: RegisterUserErrorAction) => {
            return MessageActions.showMessage({
                message: Message.error('Error during registration.', action.error)
            });
        })
    ));

    // endregion
}
