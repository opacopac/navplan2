import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightMapState} from './flight-map-state';


export const getFlightMapState = createFeatureSelector<FlightMapState>('flightMapState');
export const getFlightMapShowOverlay = createSelector(getFlightMapState, state => state.showMapOverlay);
export const getFlightMapShowMeteoLayer = createSelector(getFlightMapState, state => state.showMeteoLayer);
export const getFlightMapMeteoLayer = createSelector(getFlightMapState, state => state.meteoLayer);
export const getFlightMapShowFullScreen = createSelector(getFlightMapState, state => state.showFullScreen);
export const getShowMapLayerSelection = createSelector(getFlightMapState, state => state.showMapLayerSelection);
