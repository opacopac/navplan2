import {createAction, props} from '@ngrx/store';
import {AirportRunway} from '../../../aerodrome/domain/model/airport-runway';
import {PlanPerfWeatherFactorsState} from '../state-model/plan-perf-weather-factors-state';
import {PlanPerfRwyFactorsState} from '../state-model/plan-perf-rwy-factors-state';
import {PlanPerfAirportState} from '../state-model/plan-perf-airport-state';


export class PlanPerfActions {
    public static readonly setAirports = createAction(
        '[Plan Performance Effects] Set Airports',
        props<{ airportStates: PlanPerfAirportState[] }>()
    );


    public static readonly changeAirportRunway = createAction(
        '[Plan Performance Tab] Change Departure Airport Runway',
        props<{ adIndex: number, runway: AirportRunway }>()
    );


    public static readonly changeAirportWeatherFactors = createAction(
        '[Plan Performance Tab] Change Departure Airport Weather Factors',
        props<{ adIndex: number, weatherFactors: PlanPerfWeatherFactorsState }>()
    );


    public static readonly changeAirportWeatherFactorsSuccess = createAction(
        '[Plan Performance Effects] Change Departure Airport Weather Factors Success',
        props<{ adIndex: number, weatherFactors: PlanPerfWeatherFactorsState }>()
    );


    public static readonly changeAirportRunwayFactors = createAction(
        '[Plan Performance Tab] Change Departure Airport Runway Factors',
        props<{ adIndex: number, runwayFactors: PlanPerfRwyFactorsState }>()
    );


    public static readonly changeAirportRunwayFactorsSuccess = createAction(
        '[Plan Performance Effects] Change Departure Airport Runway Factors Success',
        props<{ adIndex: number, runwayFactors: PlanPerfRwyFactorsState }>()
    );
}
