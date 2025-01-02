import {createAction, props} from '@ngrx/store';
import {PlanPerfAirportState} from '../state-model/plan-perf-airport-state';


export class PlanPerfActions {
    public static readonly changeDepartureAirportPerformance = createAction(
        '[Plan Performance Tab] Change Departure Airport Performance',
        props<{ airportPerformance: PlanPerfAirportState }>()
    );


    public static readonly changeDestinationAirportPerformance = createAction(
        '[Plan Performance Tab] Change Destination Airport Performance',
        props<{ airportPerformance: PlanPerfAirportState }>()
    );


    public static readonly changeAlternateAirportPerformance = createAction(
        '[Plan Performance Tab] Change Alternate Airport Performance',
        props<{ airportPerformance: PlanPerfAirportState }>()
    );
}
