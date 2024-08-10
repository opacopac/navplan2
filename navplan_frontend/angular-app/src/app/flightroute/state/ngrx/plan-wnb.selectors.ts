import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PlanWnbState} from '../state-model/plan-wnb-state';


export const getPlanWnbSState = createFeatureSelector<PlanWnbState>('planWnbState');
export const getPlanWnbWeightItems = createSelector(getPlanWnbSState, state => state.weightItems);
