import {AirportRunway} from '../../../aerodrome/domain/model/airport-runway';
import {PlanPerfWeatherFactorsState} from './plan-perf-weather-factors-state';
import {PlanPerfRwyFactorsState} from './plan-perf-rwy-factors-state';
import {Airport} from '../../../aerodrome/domain/model/airport';
import {PlanPerfTakeoffCalculationState} from './plan-perf-takeoff-calculation-state';
import {PlanPerfLandingCalculationState} from './plan-perf-landing-calculation-state';

export interface PlanPerfAirportState {
    airport: Airport;
    runway: AirportRunway;
    weatherFactors: PlanPerfWeatherFactorsState;
    runwayFactors: PlanPerfRwyFactorsState;
    aircraftPerfProfileIdx: number;
    tkofPerformance: PlanPerfTakeoffCalculationState;
    ldaPerformance: PlanPerfLandingCalculationState;
}
