import {PlanPerfAirportState} from './plan-perf-airport-state';


export interface PlanWnbState {
    departureAirportState: PlanPerfAirportState;
    destinationAirportState: PlanPerfAirportState;
    alternateAirportState: PlanPerfAirportState;
}
