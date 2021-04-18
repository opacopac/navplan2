import {AppState} from './app-state';
import {AppActions, AppActionTypes} from './app.actions';


const initialState: AppState = {
    dummy: false
};


export function appReducer(state: AppState = initialState, action: AppActions) {
    switch (action.type) {
        case AppActionTypes.APP_DUMMY:
            return {...state, dummy: true};

        default:
            return state;
    }
}
