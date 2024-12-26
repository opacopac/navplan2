import {createReducer, on} from '@ngrx/store';
import {PlanPerfState} from '../state-model/plan-perf-state';
import {PlanPerfActions} from './plan-perf.actions';


const initialState: PlanPerfState = {
    departureAirportState: null,
    destinationAirportState: null,
    alternateAirportState: null,
};


export const planPerfReducer = createReducer(
    initialState,

    on(PlanPerfActions.selectRunway, (state, action) => ({
        ...state,
        departureAirportState: null
    })),
);
