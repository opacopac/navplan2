import {createAction, props} from '@ngrx/store';
import {PlanPerfWeatherFactorsState} from '../state-model/plan-perf-weather-factors-state';
import {PlanPerfRwyFactorsState} from '../state-model/plan-perf-rwy-factors-state';
import {PlanPerfAirportState} from '../state-model/plan-perf-airport-state';
import {PlanPerfWeatherCalculationState} from '../state-model/plan-perf-weather-calculation-state';
import {PlanPerfTakeoffCalculationState} from '../state-model/plan-perf-takeoff-calculation-state';
import {PlanPerfLandingCalculationState} from '../state-model/plan-perf-landing-calculation-state';


export class PlanPerfActions {
    public static readonly updateAirports = createAction(
        '[Plan Performance Effects] Update Airports',
        props<{ airportStates: PlanPerfAirportState[] }>()
    );


    public static readonly changeAirportWeatherFactors = createAction(
        '[Plan Performance Tab] Change Airport Weather Factors',
        props<{ adIndex: number, weatherFactors: PlanPerfWeatherFactorsState }>()
    );


    public static readonly updateAirportWeatherCalculation = createAction(
        '[Plan Performance Effects] Update Airport Weather Calculation',
        props<{ adIndex: number, weatherCalculation: PlanPerfWeatherCalculationState }>()
    );


    public static readonly changeAirportRunwayFactors = createAction(
        '[Plan Performance Tab] Change Airport Runway Factors',
        props<{ adIndex: number, runwayFactors: PlanPerfRwyFactorsState }>()
    );


    public static readonly updateAirportTakeoffPerformance = createAction(
        '[Plan Performance Effects] Update Airport Takeoff Performance',
        props<{ adIndex: number, takeoffPerformance: PlanPerfTakeoffCalculationState }>()
    );


    public static readonly updateAirportLandingPerformance = createAction(
        '[Plan Performance Effects] Update Airport Landing Performance',
        props<{ adIndex: number, landingPerformance: PlanPerfLandingCalculationState }>()
    );
}
