import {NotamState} from '../domain-model/notam-state';
import {NotamActions} from './notam.actions';
import {createReducer, on} from '@ngrx/store';


const initialState: NotamState = {
    extent: undefined,
    zoom: undefined,
    notamList: [],
    timestampMs: 0
};


export const notamReducer = createReducer(
    initialState,
    on(NotamActions.showNotams, (state, action) => ({
        ...state,
        extent: action.extent,
        zoom: action.zoom,
        notamList: action.notamList,
        timestampMs: action.timestampMs
    })),
);
