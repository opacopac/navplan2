import {createAction, props} from '@ngrx/store';
import {User} from '../../domain/model/user';

export class LostPwActions {
    public static readonly sendLostPwEmail = createAction(
        '[Lost Password Page] Send lost pw email',
        props<{ email: string }>()
    );

    public static readonly sendLostPwEmailSuccess = createAction(
        '[LostPwEffects] Lost pw email successfully sent',
        props<{ email: string }>()
    );

    public static readonly sendLostPwEmailError = createAction(
        '[LostPwEffects] Error sending lost pw email',
        props<{ error: Error }>()
    );

    public static readonly userResetPw = createAction(
        '[Reset Password Page] Reset password',
        props<{ token: string, newPassword: string, rememberMe: boolean }>()
    );

    public static readonly userResetPwSuccess = createAction(
        '[LostPwEffects] Reset password successful',
        props<{ user: User, rememberMe: boolean }>()
    );

    public static readonly userResetPwError = createAction(
        '[LostPwEffects] Reset password error',
        props<{ error: Error }>()
    );
}
