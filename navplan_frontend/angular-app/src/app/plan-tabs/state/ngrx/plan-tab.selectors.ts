import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PlanTabState} from '../state-model/plan-tab-state';


export const getPlanTabState = createFeatureSelector<PlanTabState>('planTabState');
export const getSelectedPlanTab = createSelector(getPlanTabState, state => state.selectedPlanTab);
