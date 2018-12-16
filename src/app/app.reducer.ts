import {ActiveMapType, AppState} from './app-state';
import {AppActions, AppActionTypes} from './app.actions';


const initialState: AppState = {
    activeMap: ActiveMapType.NONE
};


export function appReducer(state: AppState = initialState, action: AppActions) {
    switch (action.type) {
        case AppActionTypes.APP_SELECT_ACTIVE_MAP:
            return { ...state, activeMap: action.activeMap };

        default:
            return state;
    }
}
