import {createAction, props} from '@ngrx/store';
import {User} from '../../domain/model/user';

export class RegisterActions {
    public static readonly userRegister = createAction(
        '[Register Page] user register',
        props<{ password: string, rememberMe: boolean }>()
    );

    public static readonly userRegisterSuccess = createAction(
        '[UserEffects] user register successful',
        props<{ user: User, rememberMe: boolean }>()
    );

    public static readonly userRegisterError = createAction(
        '[UserEffects] user register error',
        props<{ error: Error }>()
    );

    public static readonly sendRegisterEmail = createAction(
        '[Register Page] send register email',
        props<{ email: string }>()
    );

    public static readonly sendRegisterEmailSuccess = createAction(
        '[UserEffects] register email successfully sent',
        props<{ email: string }>()
    );

    public static readonly sendRegisterEmailError = createAction(
        '[UserEffects] error sending register email',
        props<{ error: Error }>()
    );
}
