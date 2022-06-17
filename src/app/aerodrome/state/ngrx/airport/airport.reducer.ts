import {createReducer, on} from '@ngrx/store';
import {AirportActions} from './airport.actions';
import {AirportState} from '../state-model/airport-state';


const initialState: AirportState = {
    extent: undefined,
    zoom: undefined,
    airports: [],
};


export const airportReducer = createReducer(
    initialState,
    on(AirportActions.readSuccess, (state, action) => ({
        ...state,
        extent: action.extent,
        zoom: action.zoom,
        airports: action.airports
    })),
);
