import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AircraftState} from '../state-model/aircraft-state';


export const getAircraftState = createFeatureSelector<AircraftState>('aircraftState');
export const getAircraftList = createSelector(getAircraftState, state => state.aircraftList);
export const getCurrentAircraft = createSelector(getAircraftState, state => state.currentAircraft);
