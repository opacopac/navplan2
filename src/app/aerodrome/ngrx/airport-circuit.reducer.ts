import {createReducer, on} from '@ngrx/store';
import {AirportCircuitActions} from './airport-circuit.actions';
import {AirportCircuitState} from '../domain-model/airport-circuit-state';


const initialState: AirportCircuitState = {
    extent: undefined,
    zoom: undefined,
    airportCircuits: []
};


export const airportCircuitReducer = createReducer(
    initialState,
    on(AirportCircuitActions.showAirportCircuits, (state, action) => ({
        ...state,
        extent: action.extent,
        zoom: action.zoom,
        airportCircuits: action.airportCircuits
    })),
);
