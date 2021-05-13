import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightMapState} from './flight-map-state';


export const getFlightMapState = createFeatureSelector<FlightMapState>('flightMapState');
export const getFlightMapAirports = createSelector(getFlightMapState, state => state.airportState.airports);
export const getFlightMapAirportCircuits = createSelector(getFlightMapState, state => state.airportCircuitState.airportCircuits);
export const getFlightMapReportingPoints = createSelector(getFlightMapState, state => state.reportingPointSectorState.reportingPoints);
export const getFlightMapReportingSectors = createSelector(getFlightMapState, state => state.reportingPointSectorState.reportingSectors);
export const getFlightMapAirspaces = createSelector(getFlightMapState, state => state.airspaceState.airspaces);
export const getFlightMapNavaids = createSelector(getFlightMapState, state => state.navaidState.navaids);
export const getFlightMapWebcams = createSelector(getFlightMapState, state => state.webcamState.webcams);
export const getFlightMapOverlay = createSelector(getFlightMapState, state => state.showOverlay);
