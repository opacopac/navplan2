import {NotamState} from './notam-state';
import {NotamActions, NotamActionTypes} from './notam.actions';


const initialState: NotamState = {
    extent: undefined,
    zoom: undefined,
    notamList: undefined
};


export function notamReducer(state: NotamState = initialState, action: NotamActions) {
    switch (action.type) {
        case NotamActionTypes.NOTAM_LOAD_SUCCESS:
            return { ...state, extent: action.extent, zoom: action.zoom, notamList: action.notamList };

        default:
            return state;
    }
}
