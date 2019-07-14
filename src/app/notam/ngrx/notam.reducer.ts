import {NotamState} from '../domain/notam-state';
import {NotamActions, NotamActionTypes} from './notam.actions';


const initialState: NotamState = {
    extent: undefined,
    zoom: undefined,
    notamList: undefined,
    timestampMs: 0
};


export function notamReducer(state: NotamState = initialState, action: NotamActions) {
    switch (action.type) {
        case NotamActionTypes.NOTAM_READ_SUCCESS:
            return {
                ...state,
                extent: action.result.extent,
                zoom: action.result.zoom,
                notamList: action.result.notamList,
                timestampMs: action.result.timestampMs
            };

        default:
            return state;
    }
}
