import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightrouteState} from '../state-model/flightroute-state';


export const getFlightrouteState = createFeatureSelector<FlightrouteState>('flightrouteState');
export const getFlightrouteList = createSelector(getFlightrouteState, state => state.flightrouteList);
export const getFlightroute = createSelector(getFlightrouteState, state => state.flightroute);
export const getUseAircraftSpeedValue = createSelector(getFlightrouteState, state => state.useAircraftSpeedValue);
export const getUseAircraftConsumptionValue = createSelector(getFlightrouteState, state => state.useAircraftConsumptionValue);
export const getFlightrouteTableState = createSelector(getFlightrouteState, state => state.flightrouteTableState);
