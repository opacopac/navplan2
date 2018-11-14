import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightrouteState} from './flightroute-state';


export const getFlightrouteState = createFeatureSelector<FlightrouteState>('flightrouteState');
export const getFlightrouteList = createSelector(getFlightrouteState, routeState => routeState.flightrouteList);
export const getFlightroute = createSelector(getFlightrouteState, routeState => routeState.flightroute);
export const getShowShareId = createSelector(getFlightrouteState, routeState => routeState.showShareId);
