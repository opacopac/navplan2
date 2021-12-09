import {createReducer, on} from '@ngrx/store';
import {AirspaceActions} from './airspace.actions';
import {AirspaceState} from '../../../enroute/domain-model/airspace-state';


const initialState: AirspaceState = {
    extent: undefined,
    zoom: undefined,
    airspaces: []
};


export const airspaceReducer = createReducer(
    initialState,
    on(AirspaceActions.updateSuccess, (state, action) => ({
        ...state,
        extent: action.extent,
        zoom: action.zoom,
        airspaces: action.airspaces
    })),
);
