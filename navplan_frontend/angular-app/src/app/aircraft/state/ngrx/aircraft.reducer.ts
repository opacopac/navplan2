import {createReducer, on} from '@ngrx/store';
import {AircraftState} from '../state-model/aircraft-state';
import {AircraftActions} from './aircraft.actions';


const initialState: AircraftState = {
    aircraftList: [],
    currentAircraft: undefined
};


export const aircraftReducer = createReducer(
    initialState,

    on(AircraftActions.showList, (state, action) => ({
        ...state,
        aircraftList: action.aircraftList
    })),

    on(AircraftActions.selectAircraftSuccess, (state, action) => ({
        ...state,
        currentAircraft: action.aircraft
    }))
);
