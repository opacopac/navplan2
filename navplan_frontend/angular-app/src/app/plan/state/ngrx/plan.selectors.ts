import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PlanState} from '../state-model/plan-state';


export const getPlanState = createFeatureSelector<PlanState>('planState');
export const getSelectedPlanTab = createSelector(getPlanState, state => state.selectedPlanTab);
