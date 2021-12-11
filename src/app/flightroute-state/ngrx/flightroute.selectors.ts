import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightrouteState} from '../state-model/flightroute-state';


export const getFlightrouteState = createFeatureSelector<FlightrouteState>('flightrouteState');
export const getFlightrouteList = createSelector(getFlightrouteState, state => state.flightrouteList);
export const getFlightroute = createSelector(getFlightrouteState, routeState => routeState.flightroute);
