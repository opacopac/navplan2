import {createAction, props} from '@ngrx/store';

export class ChangePwActions {
    public static readonly userChangePw = createAction(
        '[User Profile] User change password',
        props<{ oldPassword: string, newPassword: string }>()
    );

    public static readonly userChangePwSuccess = createAction(
        '[UserEffects] User change password successful'
    );

    public static readonly userChangePwError = createAction(
        '[UserEffects] User change password error',
        props<{ error: Error }>()
    );
}
