import {UserActions, UserActionTypes} from './user.actions';
import {UserState} from './user-state';


export const initialState: UserState = {
    currentUser: undefined,
    registerEmailSentTo: undefined,
    lostPwEmailSentTo: undefined,
};


export function userReducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.USER_LOGIN_SUCCESS:
        case UserActionTypes.USER_AUTOLOGIN_SUCCESS:
        case UserActionTypes.USER_REGISTER_SUCCESS:
        case UserActionTypes.USER_RESET_PW_SUCCESS:
            return {
                ...state,
                currentUser: action.user,
                registerEmailSentTo: undefined,
                lostPwEmailSentTo: undefined,
            };

        case UserActionTypes.USER_LOGOUT:
        case UserActionTypes.USER_AUTOLOGIN_ERROR:
        case UserActionTypes.USER_LOGIN_ERROR:
        case UserActionTypes.USER_REGISTER_ERROR:
        case UserActionTypes.USER_RESET_PW_ERROR:
            return {
                ...state,
                currentUser: undefined,
                registerEmailSentTo: undefined,
                lostPwEmailSentTo: undefined,
            };

        case UserActionTypes.USER_SEND_REGISTER_EMAIL_SUCCESS:
            return {
                ...state,
                registerEmailSentTo: action.email
            };

        case UserActionTypes.USER_SEND_LOST_PW_EMAIL_SUCCESS:
            return {
                ...state,
                lostPwEmailSentTo: action.email
            };

        default:
            return state;
    }
}
