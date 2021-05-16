import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightMapState} from '../domain-model/flight-map-state';


export const getFlightMapState = createFeatureSelector<FlightMapState>('flightMapState');
export const getFlightMapOverlay = createSelector(getFlightMapState, state => state.showOverlay);
export const getFlightMapAirportOverlay = createSelector(getFlightMapState, state => state.showAirportOverlay);
