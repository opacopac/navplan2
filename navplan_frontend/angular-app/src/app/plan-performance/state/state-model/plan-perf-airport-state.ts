import {PlanPerfWeatherFactorsState} from './plan-perf-weather-factors-state';
import {PlanPerfRwyFactorsState} from './plan-perf-rwy-factors-state';
import {Airport} from '../../../aerodrome/domain/model/airport';
import {PlanPerfTakeoffCalculationState} from './plan-perf-takeoff-calculation-state';
import {PlanPerfLandingCalculationState} from './plan-perf-landing-calculation-state';
import {PlanPerfAirportType} from './plan-perf-airport-type';
import {PlanPerfWeatherCalculationState} from './plan-perf-weather-calculation-state';

export interface PlanPerfAirportState {
    type: PlanPerfAirportType;
    airport: Airport;
    weatherFactors: PlanPerfWeatherFactorsState;
    weatherCalculation: PlanPerfWeatherCalculationState;
    runwayFactors: PlanPerfRwyFactorsState;
    aircraftPerfProfileIdx: number;
    tkofPerformance: PlanPerfTakeoffCalculationState;
    ldgPerformance: PlanPerfLandingCalculationState;
}
