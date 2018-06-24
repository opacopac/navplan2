import {User} from '../../model/session/user';
import {RegisterUserSuccessAction, UserActions, UserActionTypes} from '../actions/user.actions';


const initialState: User = undefined;

export function userReducer(state: User = initialState, action: UserActions) {
    switch (action.type) {
        case UserActionTypes.USER_LOGIN_SUCCESS:
        case UserActionTypes.USER_REGISTER_SUCCESS:
            return (action as RegisterUserSuccessAction).user;
        case UserActionTypes.USER_LOGOUT:
        case UserActionTypes.USER_LOGIN_ERROR:
        case UserActionTypes.USER_REGISTER_ERROR:
            return initialState;
        default:
            return state;
    }
}
