import { JsDate } from '../../../system/domain/service/date/js-date';
import {NotamState} from '../state-model/notam-state';
import {NotamActions} from './notam.actions';
import {createReducer, on} from '@ngrx/store';
import {TimestampInterval} from '../../../geo-physics/domain/model/quantities/timestamp-interval';


const initialState: NotamState = {
    extent: undefined,
    zoom: undefined,
    notamList: [],
    lastLoadTimestampMs: 0,
    interval: TimestampInterval.fromEpochMs(
        JsDate.getDayStartTimestampStatic(),
        JsDate.getDayEndTimestampStatic(2)
    )
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
