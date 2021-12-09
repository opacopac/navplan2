import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightrouteState} from './flightroute-state';


export const getFlightrouteState = createFeatureSelector<FlightrouteState>('flightrouteState');
export const getFlightroute = createSelector(getFlightrouteState, routeState => routeState.flightroute);
