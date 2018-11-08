import {UserActions, UserActionTypes} from './user.actions';
import {UserState} from './user-state';


export const initialState: UserState = {
    currentUser: undefined
};


export function userReducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.USER_LOGIN_SUCCESS:
        case UserActionTypes.USER_REGISTER_SUCCESS:
            return { ...state, currentUser: action.user };
        case UserActionTypes.USER_LOGOUT:
        case UserActionTypes.USER_LOGIN_ERROR:
        case UserActionTypes.USER_REGISTER_ERROR:
            return { ...state, currentUser: undefined};
        default:
            return state;
    }
}
