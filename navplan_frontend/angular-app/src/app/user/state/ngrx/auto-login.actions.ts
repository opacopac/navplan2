import {createAction, props} from '@ngrx/store';
import {User} from '../../domain/model/user';

export class AutoLoginActions {
    public static readonly userAutoLogin = createAction(
        '[Main Page] user auto login',
        props<{ token: string }>()
    );

    public static readonly userAutoLoginSuccess = createAction(
        '[UserEffects] user auto login successful',
        props<{ user: User }>()
    );

    public static readonly userAutoLoginError = createAction(
        '[UserEffects] user auto login error',
        props<{ error: Error }>()
    );
}
