import { JsDate } from '../../../system/domain/service/date/js-date';
import {NotamState} from '../state-model/notam-state';
import {NotamActions} from './notam.actions';
import {createReducer, on} from '@ngrx/store';


const initialState: NotamState = {
    extent: undefined,
    zoom: undefined,
    notamList: [],
    lastLoadTimestampMs: 0,
    minStartTimestamp: JsDate.getDayStartTimestampStatic(), // TODO
    maxEndTimestamp: JsDate.getDayEndTimestampStatic(2) // TODO
};


export const notamReducer = createReducer(
    initialState,
    on(NotamActions.readSuccess, (state, action) => ({
        ...state,
        extent: action.extent,
        zoom: action.zoom,
        notamList: action.notamList,
        lastLoadTimestampMs: action.timestampMs
    })),
);
