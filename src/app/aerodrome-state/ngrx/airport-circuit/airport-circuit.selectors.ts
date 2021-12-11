import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AirportCircuitState} from '../state-model/airport-circuit-state';


export const getAirportCircuitState = createFeatureSelector<AirportCircuitState>('airportCircuitState');
export const getAirportCircuits = createSelector(getAirportCircuitState, state => state.airportCircuits);
