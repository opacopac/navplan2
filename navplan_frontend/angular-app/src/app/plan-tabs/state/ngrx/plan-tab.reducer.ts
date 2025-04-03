import {createReducer, on} from '@ngrx/store';
import {PlanTabState} from '../state-model/plan-tab-state';
import {PlanTabsActions} from './plan-tabs.actions';


export const initialPlanTabState: PlanTabState = {
    selectedPlanTab: undefined,
};


export const planTabReducer = createReducer(
    initialPlanTabState,

    on(PlanTabsActions.selectPlanTab, (state, action) => ({
        ...state,
        selectedPlanTab: action.selectedPlanTab
    })),
);
