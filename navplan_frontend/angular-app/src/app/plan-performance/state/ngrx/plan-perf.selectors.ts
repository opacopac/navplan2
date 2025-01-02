import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PlanPerfState} from '../state-model/plan-perf-state';


export const getPlanPerfState = createFeatureSelector<PlanPerfState>('planPerfState');
export const getDepartureAirportPerfState = createSelector(getPlanPerfState, state => state.departureAirportState);
export const getDestinationAirportPerfState = createSelector(getPlanPerfState, state => state.destinationAirportState);
export const getAlternateAirportPerfState = createSelector(getPlanPerfState, state => state.alternateAirportState);
