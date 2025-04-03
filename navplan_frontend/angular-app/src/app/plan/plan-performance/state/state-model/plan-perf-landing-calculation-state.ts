import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {AirportRunway} from '../../../../aerodrome/domain/model/airport-runway';
import {PlanPerfLandingChartState} from './plan-perf-landing-chart-state';

export interface PlanPerfLandingCalculationState {
    rwy: AirportRunway;
    oppRwy: AirportRunway;
    threshold: Length;
    oppThreshold: Length;
    ldgDist50ft: Length;
    ldgGroundRoll: Length;
    touchdownAfterThr: Length;
    ldgChartState: PlanPerfLandingChartState;
}
