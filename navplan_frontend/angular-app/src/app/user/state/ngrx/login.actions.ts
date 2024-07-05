import {createAction, props} from '@ngrx/store';
import {User} from '../../domain/model/user';

export class LoginActions {
    public static readonly userLogin = createAction(
        '[Login Page] user login',
        props<{ email: string, password: string, rememberMe: boolean }>()
    );

    public static readonly userLoginSuccess = createAction(
        '[UserEffects] user login successful',
        props<{ user: User, rememberMe: boolean }>()
    );

    public static readonly userLoginError = createAction(
        '[UserEffects] user login error',
        props<{ error: Error }>()
    );
}
