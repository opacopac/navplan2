import {Action} from '@ngrx/store';
import {User} from './model/user';


export enum UserActionTypes {
    USER_AUTOLOGIN = '[Startup] Auto login',
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
    USER_LOGOUT_SUCCESS = '[UserService] Logout success',
    USER_LOGOUT_ERROR = '[UserService] Logout error',
}


export class AutoLoginUserAction implements Action {
    readonly type = UserActionTypes.USER_AUTOLOGIN;

    constructor(
        public email: string,
        public token: string) {}
}


export class LoginUserAction implements Action {
    readonly type = UserActionTypes.USER_LOGIN;

    constructor(
        public email: string,
        public password: string,
        public remember: boolean) {}
}


export class LoginUserSuccessAction implements Action {
    readonly type = UserActionTypes.USER_LOGIN_SUCCESS;

    constructor(
        public user: User,
        public remember: boolean) {}
}


export class LoginUserErrorAction implements Action {
    readonly type = UserActionTypes.USER_LOGIN_ERROR;

    constructor(public error: string) {}
}


export class RegisterUserAction implements Action {
    readonly type = UserActionTypes.USER_REGISTER;

    constructor(
        public email: string,
        public password: string,
        public remember: boolean) {}
}


export class RegisterUserSuccessAction implements Action {
    readonly type = UserActionTypes.USER_REGISTER_SUCCESS;

    constructor(
        public user: User,
        public remember: boolean) {}
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


export class LogoutUserSuccessAction implements Action {
    readonly type = UserActionTypes.USER_LOGOUT_SUCCESS;

    constructor() {}
}


export class LogoutUserErrorAction implements Action {
    readonly type = UserActionTypes.USER_LOGOUT_ERROR;

    constructor(public error: string) {}
}


export type UserActions =
    AutoLoginUserAction |
    LoginUserAction |
    LoginUserSuccessAction |
    LoginUserErrorAction |
    RegisterUserAction |
    RegisterUserSuccessAction |
    RegisterUserErrorAction |
    ChangePwAction |
    ChangePwSuccessAction |
    ChangePwErrorAction |
    LogoutUserAction |
    LogoutUserSuccessAction |
    LogoutUserErrorAction;
