import {createReducer, on} from '@ngrx/store';
import {AircraftState} from '../state-model/aircraft-state';
import {AircraftListActions} from './aircraft-list.actions';
import {AircraftDetailsActions} from './aircraft-details-actions';


const initialState: AircraftState = {
    aircraftList: [],
    currentAircraft: undefined
};


export const aircraftReducer = createReducer(
    initialState,

    on(AircraftListActions.showList, (state, action) => ({
        ...state,
        aircraftList: action.aircraftList
    })),

    on(AircraftListActions.selectAircraftSuccess, (state, action) => ({
        ...state,
        currentAircraft: action.aircraft
    })),

    on(AircraftDetailsActions.changeVehicleType, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.vehicleType = action.vehicleType;
        return {
            ...state,
            currentAircraft: newAircraft
        };
    }),

    on(AircraftDetailsActions.changeRegistration, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.registration = action.registration;
        return {
            ...state,
            currentAircraft: newAircraft
        };
    }),

    on(AircraftDetailsActions.changeIcaoType, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.icaoType = action.icaoType;
        return {
            ...state,
            currentAircraft: newAircraft
        };
    }),

    on(AircraftDetailsActions.changeCruiseSpeed, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.cruiseSpeed = action.cruiseSpeed;
        return {
            ...state,
            currentAircraft: newAircraft
        };
    }),

    on(AircraftDetailsActions.changeCruiseConumption, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.cruiseFuel = action.cruiseFuel;
        return {
            ...state,
            currentAircraft: newAircraft
        };
    })
);
