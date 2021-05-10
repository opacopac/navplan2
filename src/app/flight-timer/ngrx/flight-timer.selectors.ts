import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightTimerState} from './flight-timer-state';


export const getFlightTimerState = createFeatureSelector<FlightTimerState>('flightTimerState');
export const getStartTime = createSelector(getFlightTimerState, state => state.startTime);
export const getInterimTime = createSelector(getFlightTimerState, state => state.interimTime);
