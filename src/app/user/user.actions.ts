import {Action} from '@ngrx/store';
import {User} from './model/user';


export enum UserActionTypes {
    USER_AUTOLOGIN = '[Startup] Auto login',
    USER_AUTOLOGIN_SUCCESS = '[Startup] Auto login successful',
    USER_LOGIN = '[Login Page] Login',
    USER_LOGIN_SUCCESS = '[UserService] Login successful',
    USER_LOGIN_ERROR = '[UserService] Login error',
    USER_REGISTER = '[Login Page] Register',
    USER_REGISTER_SUCCESS = '[UserService] Register successful',
    USER_REGISTER_ERROR = '[UserService] Register error',
    USER_CHANGE_PW = '[User Profile] Change password',
    USER_CHANGE_PW_SUCCESS = '[UserService] Change password successful',
    USER_CHANGE_PW_ERROR = '[UserService] Change password error',
    USER_LOGOUT = '[User Profile] Logout',
}


export class AutoLoginUserAction implements Action {
    readonly type = UserActionTypes.USER_AUTOLOGIN;

    constructor(public token: string) {}
}


export class AutoLoginUserSuccessAction implements Action {
    readonly type = UserActionTypes.USER_AUTOLOGIN_SUCCESS;

    constructor(public user: User) {}
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

    constructor(public error: string) {}
}


export class RegisterUserAction implements Action {
    readonly type = UserActionTypes.USER_REGISTER;

    constructor(
        public email: string,
        public password: string) {}
}


export class RegisterUserSuccessAction implements Action {
    readonly type = UserActionTypes.USER_REGISTER_SUCCESS;

    constructor(
        public user: User,
        public rememberMe: boolean) {}
}


export class RegisterUserErrorAction implements Action {
    readonly type = UserActionTypes.USER_REGISTER_ERROR;

    constructor(public error: string) {}
}


export class ChangePwAction implements Action {
    readonly type = UserActionTypes.USER_CHANGE_PW;

    constructor(
        public email: string,
        public oldPassword: string,
        public newPassword: string) {}
}


export class ChangePwSuccessAction implements Action {
    readonly type = UserActionTypes.USER_CHANGE_PW_SUCCESS;

    constructor(public user: User) {}
}


export class ChangePwErrorAction implements Action {
    readonly type = UserActionTypes.USER_CHANGE_PW_ERROR;

    constructor(public error: string) {}
}


export class LogoutUserAction implements Action {
    readonly type = UserActionTypes.USER_LOGOUT;

    constructor(
        public email: string,
        public token: string) {}
}


export type UserActions =
    AutoLoginUserAction |
    AutoLoginUserSuccessAction |
    LoginUserAction |
    LoginUserSuccessAction |
    LoginUserErrorAction |
    RegisterUserAction |
    RegisterUserSuccessAction |
    RegisterUserErrorAction |
    ChangePwAction |
    ChangePwSuccessAction |
    ChangePwErrorAction |
    LogoutUserAction;
