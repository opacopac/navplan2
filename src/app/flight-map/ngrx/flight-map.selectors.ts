import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightMapState} from '../domain-model/flight-map-state';


export const getFlightMapState = createFeatureSelector<FlightMapState>('flightMapState');
export const getIsActive = createSelector(getFlightMapState, state => state.isActive);
