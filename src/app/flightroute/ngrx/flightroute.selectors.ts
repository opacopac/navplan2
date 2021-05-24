import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightrouteState} from '../domain-model/flightroute-state';


export const getFlightrouteState = createFeatureSelector<FlightrouteState>('flightrouteState');
export const getFlightrouteList = createSelector(getFlightrouteState, routeState => routeState.flightrouteList);
export const getFlightroute = createSelector(getFlightrouteState, routeState => routeState.flightroute);
