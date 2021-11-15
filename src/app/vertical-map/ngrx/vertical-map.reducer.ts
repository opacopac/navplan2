import {VerticalMapActions} from './vertical-map.actions';
import {createReducer, on} from '@ngrx/store';
import {VerticalMapState} from '../domain-model/vertical-map-state';
import {VerticalMapButtonStatus} from '../domain-model/vertical-map-button-status';


const initialState: VerticalMapState = {
    buttonStatus: VerticalMapButtonStatus.OFF,
    verticalMap: undefined,
};


export const verticalMapReducer = createReducer(
    initialState,
    on(VerticalMapActions.open, (state, action) => ({
        ...state,
        buttonStatus: VerticalMapButtonStatus.WAITING,
    })),
    on(VerticalMapActions.show, (state, action) => ({
        ...state,
        buttonStatus: VerticalMapButtonStatus.CURRENT,
        verticalMap: action.verticalMap
    })),
    on(VerticalMapActions.error, (state) => ({
        ...state,
        buttonStatus: VerticalMapButtonStatus.ERROR,
    })),
    on(VerticalMapActions.close, (state) => ({
        ...state,
        buttonStatus: VerticalMapButtonStatus.OFF,
        verticalMap: undefined
    })),
);
