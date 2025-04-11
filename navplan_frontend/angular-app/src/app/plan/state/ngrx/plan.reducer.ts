import {createReducer, on} from '@ngrx/store';
import {PlanState} from '../state-model/plan-state';
import {PlanActions} from './plan.actions';


export const initialPlanState: PlanState = {
    selectedPlanTab: undefined,
};


export const planReducer = createReducer(
    initialPlanState,

    on(PlanActions.selectPlanTab, (state, action) => ({
        ...state,
        selectedPlanTab: action.selectedPlanTab
    })),
);
