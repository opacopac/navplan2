import {createReducer, on} from '@ngrx/store';
import {AirspaceActions} from './airspace.actions';
import {AirspaceState} from '../../domain-model/airspace-state';


const initialState: AirspaceState = {
    extent: undefined,
    zoom: undefined,
    airspaces: []
};


export const airspaceReducer = createReducer(
    initialState,
    on(AirspaceActions.showAirspaces, (state, action) => ({
        ...state,
        extent: action.extent,
        zoom: action.zoom,
        airspaces: action.airspaces
    })),
);
