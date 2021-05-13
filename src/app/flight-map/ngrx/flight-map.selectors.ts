import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightMapState} from './flight-map-state';


export const getFlightMapState = createFeatureSelector<FlightMapState>('flightMapState');
export const getFlightMapAirports = createSelector(getFlightMapState, state => state.airports);
export const getFlightMapAirportCircuits = createSelector(getFlightMapState, state => state.airportCircuits);
export const getFlightMapReportingPoints = createSelector(getFlightMapState, state => state.reportingPoints);
export const getFlightMapReportingSectors = createSelector(getFlightMapState, state => state.reportingSector);
export const getFlightMapAirspaces = createSelector(getFlightMapState, state => state.airspaces);
export const getFlightMapNavaids = createSelector(getFlightMapState, state => state.navaids);
export const getFlightMapWebcams = createSelector(getFlightMapState, state => state.webcams);
export const getFlightMapAirportOverlay = createSelector(getFlightMapState, state => state.showAirportOverlay);
export const getFlightMapReportingPointOverlay = createSelector(getFlightMapState, state => state.showReportingPointOverlay);
export const getFlightMapReportingSectorOverlay = createSelector(getFlightMapState, state => state.showReportingSectorOverlay);
export const getFlightMapNavaidOverlay = createSelector(getFlightMapState, state => state.showNavaidOverlay);
