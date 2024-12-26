import {PlanPerfAirportState} from './plan-perf-airport-state';


export interface PlanPerfState {
    departureAirportState: PlanPerfAirportState;
    destinationAirportState: PlanPerfAirportState;
    alternateAirportState: PlanPerfAirportState;
}
