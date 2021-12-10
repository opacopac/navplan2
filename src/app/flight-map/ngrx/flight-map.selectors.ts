import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightMapState} from './flight-map-state';


export const getFlightMapState = createFeatureSelector<FlightMapState>('flightMapState');
export const getFlightMapOverlay = createSelector(getFlightMapState, state => state.showOverlay);
