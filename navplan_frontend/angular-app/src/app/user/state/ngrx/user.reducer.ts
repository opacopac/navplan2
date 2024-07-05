import {UserState} from '../state-model/user-state';
import {createReducer, on} from '@ngrx/store';
import {LoginActions} from './login.actions';
import {AutoLoginActions} from './auto-login.actions';
import {RegisterActions} from './register.actions';
import {LostPwActions} from './lost-pw.actions';
import {LogoutActions} from './logout.actions';


export const initialState: UserState = {
    currentUser: undefined,
    registerEmailSentTo: undefined,
    lostPwEmailSentTo: undefined,
};


export const userReducer = createReducer(
    initialState,
    on(
        LoginActions.userLoginSuccess,
        AutoLoginActions.userAutoLoginSuccess,
        RegisterActions.userRegisterSuccess,
        LostPwActions.userResetPwSuccess,
        (state, action) => ({
            ...state,
            currentUser: action.user,
            registerEmailSentTo: undefined,
            lostPwEmailSentTo: undefined,
        })
    ),

    on(
        LogoutActions.userLogout,
        AutoLoginActions.userAutoLoginError,
        LoginActions.userLoginError,
        RegisterActions.userRegisterError,
        LostPwActions.userResetPwError,
        (state) => ({
            ...state,
            currentUser: undefined,
            registerEmailSentTo: undefined,
            lostPwEmailSentTo: undefined,
        })
    ),

    on(RegisterActions.sendRegisterEmailSuccess, (state, action) => ({
        ...state,
        registerEmailSentTo: action.email,
    })),

    on(LostPwActions.sendLostPwEmailSuccess, (state, action) => ({
        ...state,
        lostPwEmailSentTo: action.email,
    }))
);
