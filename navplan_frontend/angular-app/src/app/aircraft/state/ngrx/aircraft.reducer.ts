import {createReducer, on} from '@ngrx/store';
import {AircraftState} from '../state-model/aircraft-state';
import {AircraftListActions} from './aircraft-list.actions';
import {AircraftDetailsActions} from './aircraft-details-actions';
import {AircraftWnbActions} from './aircraft-wnb-actions';
import {AircraftCrudActions} from './aircraft-crud-actions';


const initialState: AircraftState = {
    aircraftList: [],
    currentAircraft: undefined
};


export const aircraftReducer = createReducer(
    initialState,

    // region aircraft list actions

    on(AircraftListActions.readListSuccessful, (state, action) => ({
        ...state,
        aircraftList: action.aircraftList
    })),

    on(AircraftListActions.selectAircraftSuccess, (state, action) => ({
        ...state,
        currentAircraft: action.aircraft
    })),

    // endregion


    // region aircraft crud actions

    on(AircraftCrudActions.saveAircraftSuccess, (state, action) => ({
        ...state,
        currentAircraft: action.aircraft
    })),

    on(AircraftCrudActions.deleteAircraftSuccess, (state, action) => ({
        ...state,
        currentAircraft: action.aircraftId !== state.currentAircraft.id ? state.currentAircraft : undefined
    })),

    // endregion


    // region aircraft details actions

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
    }),

    on(AircraftDetailsActions.changeFuelType, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.fuelType = action.fuelType;
        return {
            ...state,
            currentAircraft: newAircraft
        };
    }),

    // endregion


    // region aircraft weight and balance actions

    on(AircraftWnbActions.changeBew, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.bew = action.bew;
        return {
            ...state,
            currentAircraft: newAircraft
        };
    }),

    on(AircraftWnbActions.changeMtow, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.mtow = action.mtow;
        return {
            ...state,
            currentAircraft: newAircraft
        };
    }),

    on(AircraftWnbActions.addWeightItem, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.wnbWeightItems.push(action.weightItem);
        newAircraft.wnbWeightItems.sort((a, b) => a.type - b.type);
        return {
            ...state,
            currentAircraft: newAircraft
        };
    }),

    on(AircraftWnbActions.editWeightItem, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.wnbWeightItems[action.weightItemIndex] = action.weightItem;
        newAircraft.wnbWeightItems.sort((a, b) => a.type - b.type);
        return {
            ...state,
            currentAircraft: newAircraft
        };
    }),

    on(AircraftWnbActions.deleteWeightItem, (state, action) => {
        const newAircraft = state.currentAircraft.clone();
        newAircraft.wnbWeightItems.splice(action.weightItemIndex, 1);
        return {
            ...state,
            currentAircraft: newAircraft
        };
    }),

    // endregion
);
