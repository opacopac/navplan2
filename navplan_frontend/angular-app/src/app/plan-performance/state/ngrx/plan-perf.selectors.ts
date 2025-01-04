import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PlanPerfState} from '../state-model/plan-perf-state';


export const getPlanPerfState = createFeatureSelector<PlanPerfState>('planPerfState');
export const getAirportPerfStates = createSelector(getPlanPerfState, state => state.airportStates);
