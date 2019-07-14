import {Action} from '@ngrx/store';
import {User} from '../domain/user';


export enum UserActionTypes {
    USER_AUTOLOGIN = '[Startup] Auto login',
    USER_AUTOLOGIN_SUCCESS = '[UserEffects] Auto login successful',
    USER_AUTOLOGIN_ERROR = '[UserEffects] Auto login error',
    USER_LOGIN = '[Login/Register Page] Login',
    USER_LOGIN_SUCCESS = '[UserEffects] Login successful',
    USER_LOGIN_ERROR = '[UserEffects] Login error',
    USER_LOGOUT = '[Navbar] Logout',
    USER_SEND_REGISTER_EMAIL = '[Login/Register Page] Send register email',
    USER_SEND_REGISTER_EMAIL_SUCCESS = '[UserEffects] Register email successfully sent',
    USER_SEND_REGISTER_EMAIL_ERROR = '[UserEffects] Error sending register email',
    USER_REGISTER = '[Register Page] Register',
    USER_REGISTER_SUCCESS = '[UserEffects] Register successful',
    USER_REGISTER_ERROR = '[UserEffects] Register error',
    USER_SEND_LOST_PW_EMAIL = '[Lost pw page 1] Send lost pw email',
    USER_SEND_LOST_PW_EMAIL_SUCCESS = '[UserEffects] Lost pw email successfully sent',
    USER_SEND_LOST_PW_EMAIL_ERROR = '[UserEffects] Error sending lost pw email',
    USER_RESET_PW = '[Lost pw page 2] Reset password',
    USER_RESET_PW_SUCCESS = '[UserEffects] Reset password successful',
    USER_RESET_PW_ERROR = '[UserEffects] Reset password error',
    USER_CHANGE_PW = '[User Profile] Change password',
    USER_CHANGE_PW_SUCCESS = '[UserEffects] Change password successful',
    USER_CHANGE_PW_ERROR = '[UserEffects] Change password error',
}


export class AutoLoginUserAction implements Action {
    readonly type = UserActionTypes.USER_AUTOLOGIN;

    constructor(public token: string) {}
}


export class AutoLoginUserSuccessAction implements Action {
    readonly type = UserActionTypes.USER_AUTOLOGIN_SUCCESS;

    constructor(public user: User) {}
}


export class AutoLoginUserErrorAction implements Action {
    readonly type = UserActionTypes.USER_AUTOLOGIN_ERROR;

    constructor(public error: Error) {}
}


export class LoginUserAction implements Action {
    readonly type = UserActionTypes.USER_LOGIN;

    constructor(
        public email: string,
        public password: string,
        public rememberMe: boolean) {}
}


export class LoginUserSuccessAction implements Action {
    readonly type = UserActionTypes.USER_LOGIN_SUCCESS;

    constructor(
        public user: User,
        public rememberMe: boolean) {}
}


export class LoginUserErrorAction implements Action {
    readonly type = UserActionTypes.USER_LOGIN_ERROR;

    constructor(public error: Error) {}
}


export class SendRegisterEmailAction implements Action {
    readonly type = UserActionTypes.USER_SEND_REGISTER_EMAIL;

    constructor(public email: string) {}
}


export class SendRegisterEmailSuccessAction implements Action {
    readonly type = UserActionTypes.USER_SEND_REGISTER_EMAIL_SUCCESS;

    constructor(public email: string) {}
}


export class SendRegisterEmailErrorAction implements Action {
    readonly type = UserActionTypes.USER_SEND_REGISTER_EMAIL_ERROR;

    constructor(public error: Error) {}
}


export class SendLostPwEmailAction implements Action {
    readonly type = UserActionTypes.USER_SEND_LOST_PW_EMAIL;

    constructor(public email: string) {}
}


export class SendLostPwEmailSuccessAction implements Action {
    readonly type = UserActionTypes.USER_SEND_LOST_PW_EMAIL_SUCCESS;

    constructor(public email: string) {}
}


export class SendLostPwEmailErrorAction implements Action {
    readonly type = UserActionTypes.USER_SEND_LOST_PW_EMAIL_ERROR;

    constructor(public error: Error) {}
}


export class RegisterUserAction implements Action {
    readonly type = UserActionTypes.USER_REGISTER;

    constructor(
        public token: string,
        public password: string,
        public rememberMe: boolean) {}
}


export class RegisterUserSuccessAction implements Action {
    readonly type = UserActionTypes.USER_REGISTER_SUCCESS;

    constructor(
        public user: User,
        public rememberMe: boolean) {}
}


export class RegisterUserErrorAction implements Action {
    readonly type = UserActionTypes.USER_REGISTER_ERROR;

    constructor(public error: Error) {}
}


export class ResetPwAction implements Action {
    readonly type = UserActionTypes.USER_RESET_PW;

    constructor(
        public token: string,
        public newPassword: string,
        public rememberMe: boolean) {}
}


export class ResetPwSuccessAction implements Action {
    readonly type = UserActionTypes.USER_RESET_PW_SUCCESS;

    constructor(
        public user: User,
        public rememberMe: boolean) {}
}


export class ResetPwErrorAction implements Action {
    readonly type = UserActionTypes.USER_RESET_PW_ERROR;

    constructor(public error: Error) { }
}


export class ChangePwAction implements Action {
    readonly type = UserActionTypes.USER_CHANGE_PW;

    constructor(
        public token: string,
        public oldPassword: string,
        public newPassword: string) {}
}


export class ChangePwSuccessAction implements Action {
    readonly type = UserActionTypes.USER_CHANGE_PW_SUCCESS;

    constructor() {}
}


export class ChangePwErrorAction implements Action {
    readonly type = UserActionTypes.USER_CHANGE_PW_ERROR;

    constructor(public error: Error) { }
}


export class LogoutUserAction implements Action {
    readonly type = UserActionTypes.USER_LOGOUT;

    constructor() {}
}


export type UserActions =
    AutoLoginUserAction |
    AutoLoginUserSuccessAction |
    AutoLoginUserErrorAction |
    LoginUserAction |
    LoginUserSuccessAction |
    LoginUserErrorAction |
    SendRegisterEmailAction |
    SendRegisterEmailSuccessAction |
    SendRegisterEmailErrorAction |
    RegisterUserAction |
    RegisterUserSuccessAction |
    RegisterUserErrorAction |
    SendLostPwEmailAction |
    SendLostPwEmailSuccessAction |
    SendLostPwEmailErrorAction |
    ResetPwAction |
    ResetPwSuccessAction |
    ResetPwErrorAction |
    ResetPwAction |
    ChangePwSuccessAction |
    ChangePwErrorAction |
    LogoutUserAction;
