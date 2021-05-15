import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightMapState} from '../domain-model/flight-map-state';


export const getFlightMapState = createFeatureSelector<FlightMapState>('flightMapState');
export const getFlightMapAirports = createSelector(getFlightMapState, state => state.airportState.airports);
export const getFlightMapAirportCharts = createSelector(getFlightMapState, state => state.airportChartState.airportCharts);
export const getFlightMapAirportCircuits = createSelector(getFlightMapState, state => state.airportCircuitState.airportCircuits);
export const getFlightMapReportingPoints = createSelector(getFlightMapState, state => state.reportingPointSectorState.reportingPoints);
export const getFlightMapReportingSectors = createSelector(getFlightMapState, state => state.reportingPointSectorState.reportingSectors);
export const getFlightMapAirspaces = createSelector(getFlightMapState, state => state.airspaceState.airspaces);
export const getFlightMapMetarTafs = createSelector(getFlightMapState, state => state.metarTafState.metarTafs);
export const getFlightMapNavaids = createSelector(getFlightMapState, state => state.navaidState.navaids);
export const getFlightMapWebcams = createSelector(getFlightMapState, state => state.webcamState.webcams);
export const getFlightMapOverlay = createSelector(getFlightMapState, state => state.showOverlay);
export const getFlightMapAirportOverlay = createSelector(getFlightMapState, state => state.showAirportOverlay);
