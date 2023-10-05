import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AirspaceState} from '../../state-model/airspace-state';


export const getAirspaceState = createFeatureSelector<AirspaceState>('airspaceState');
export const getAirspaces = createSelector(getAirspaceState, state => state.airspaces);
