import {Action} from '@ngrx/store';
import {CoreState} from './model/core-state';
import {UserActions} from '../user/user.actions';
import * as fromUser from '../user/user.reducer';


const initialState: CoreState = {
    // userState: fromUser.initialState,
    dummyState: 'MEEP',
};

export function coreReducer(state: CoreState = initialState, action: Action): CoreState {
    return { ...state,
        // userState: fromUser.userReducer(state.userState, action as UserActions),
        dummyState: undefined,
    };
}
