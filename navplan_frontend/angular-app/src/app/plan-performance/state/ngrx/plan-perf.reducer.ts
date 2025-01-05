import {createReducer, on} from '@ngrx/store';
import {PlanPerfState} from '../state-model/plan-perf-state';
import {PlanPerfActions} from './plan-perf.actions';


const initialState: PlanPerfState = {
    airportStates: []
};


export const planPerfReducer = createReducer(
    initialState,

    on(PlanPerfActions.updateAirports, (state, action) => ({
        ...state,
        airportStates: action.airportStates
    })),

    on(PlanPerfActions.changeAirportWeatherFactors, (state, action) => ({
        ...state,
        airportStates: state.airportStates.map((adState, index) => index === action.adIndex
            ? {...adState, weatherFactors: action.weatherFactors}
            : adState
        )
    })),

    on(PlanPerfActions.updateAirportWeatherCalculation, (state, action) => ({
        ...state,
        airportStates: state.airportStates.map((adState, index) => index === action.adIndex
            ? {...adState, weatherCalculation: action.weatherCalculation}
            : adState
        )
    })),

    on(PlanPerfActions.changeAirportRunwayFactors, (state, action) => ({
        ...state,
        airportStates: state.airportStates.map((adState, index) => index === action.adIndex
            ? {...adState, runwayFactors: action.runwayFactors}
            : adState
        )
    })),

    on(PlanPerfActions.updateAirportTakeoffPerformance, (state, action) => ({
        ...state,
        airportStates: state.airportStates.map((adState, index) => index === action.adIndex
            ? {...adState, tkofPerformance: action.takeoffPerformance}
            : adState
        )
    })),

    on(PlanPerfActions.updateAirportLandingPerformance, (state, action) => ({
            ...state,
            airportStates: state.airportStates.map((adState, index) => index === action.adIndex
                ? {...adState, ldaPerformance: action.landingPerformance}
                : adState
            )
        })
    ))
;
