import {VerticalMapActions} from './vertical-map.actions';
import {createReducer, on} from '@ngrx/store';
import {VerticalMapState} from '../domain-model/vertical-map-state';


const initialState: VerticalMapState = {
    isVisible: false,
    flightRoute: undefined,
    terrainPos: [],
    verticalAirspaces: []
};


export const verticalMapReducer = createReducer(
    initialState,
    on(VerticalMapActions.show, (state, action) => ({
        ...state,
        isVisible: true
    })),
    on(VerticalMapActions.hide, (state) => ({
        ...state,
        isVisible: false
    })),
);
