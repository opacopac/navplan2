import {createAction} from '@ngrx/store';

export class LogoutActions {
    public static readonly userLogout = createAction(
        '[Navbar] User Logout'
    );
}
