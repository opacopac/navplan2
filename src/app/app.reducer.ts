import {AppState} from './app-state';
import {AppActions} from './app.actions';


const initialState: AppState = {
    dummyState: undefined
};


export function appReducer(state: AppState = initialState, action: AppActions) {
    switch (action.type) {
        default:
            return state;
    }
}
