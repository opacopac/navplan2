import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {ClientstorageHelper} from '../../../system/domain/service/clientstorage/clientstorage-helper';
import {IUserService} from '../../domain/service/i-user.service';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {RegisterActions} from './register.actions';


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

    sendRegisterEmail$ = createEffect(() => this.actions$.pipe(
        ofType(RegisterActions.sendRegisterEmail),
        switchMap(action => this.userService.sendRegisterEmail(action.email).pipe(
            map(email => RegisterActions.sendRegisterEmailSuccess({email: email})),
            catchError(error => of(RegisterActions.sendRegisterEmailError({error: error})))
        ))
    ));


    sendRegisterEmailSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(RegisterActions.sendRegisterEmailSuccess),
        map(action => MessageActions.showMessage({
            message: Message.success('Verification email successfully sent to ' + action.email + '!')
        }))
    ));


    sendRegisterEmailError$ = createEffect(() => this.actions$.pipe(
        ofType(RegisterActions.sendRegisterEmailError),
        map(action => MessageActions.showMessage({
            message: Message.error('Error while sending verification email.', action.error)
        }))
    ));

    // endregion


    // region registration - step 2

    registerUser$ = createEffect(() => this.actions$.pipe(
        ofType(RegisterActions.userRegister),
        mergeMap(action => this.userService.register(action.password, action.rememberMe).pipe(
            map(user => RegisterActions.userRegisterSuccess({user: user, rememberMe: action.rememberMe})),
            catchError(error => of(RegisterActions.userRegisterError({error: error})))
        ))
    ));


    registerUserSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(RegisterActions.userRegisterSuccess),
        tap(action => {
            this.clientStorageService.persistToken(action.user.token, action.rememberMe);
            this.router.navigate(['/map']);
        }),
        map(action => MessageActions.showMessage({
            message: Message.success('Welcome ' + action.user.email + '!')
        }))
    ));


    registerUserError$ = createEffect(() => this.actions$.pipe(
        ofType(RegisterActions.userRegisterError),
        map(action => MessageActions.showMessage({
            message: Message.error('Error during registration.', action.error)
        }))
    ));

    // endregion
}
