import {createAction, props} from '@ngrx/store';
import {AirportRunway} from '../../../aerodrome/domain/model/airport-runway';
import {PlanPerfWeatherFactorsState} from '../state-model/plan-perf-weather-factors-state';
import {PlanPerfRwyFactorsState} from '../state-model/plan-perf-rwy-factors-state';
import {Airport} from '../../../aerodrome/domain/model/airport';


export class PlanPerfActions {
    public static readonly changeDepartureAirport = createAction(
        '[Plan Performance Effects] Change Departure Airport',
        props<{ airport: Airport }>()
    );


    public static readonly changeDepartureAirportRunway = createAction(
        '[Plan Performance Tab] Change Departure Airport Runway',
        props<{ runway: AirportRunway }>()
    );


    public static readonly changeDepartureAirportWeatherFactors = createAction(
        '[Plan Performance Tab] Change Departure Airport Weather Factors',
        props<{ weatherFactors: PlanPerfWeatherFactorsState }>()
    );


    public static readonly changeDepartureAirportRunwayFactors = createAction(
        '[Plan Performance Tab] Change Departure Airport Runway Factors',
        props<{ runwayFactors: PlanPerfRwyFactorsState }>()
    );


    public static readonly changeDestinationAirport = createAction(
        '[Plan Performance Effects] Change Destination Airport',
        props<{ airport: Airport }>()
    );


    public static readonly changeDestinationAirportRunway = createAction(
        '[Plan Performance Tab] Change Destination Airport Runway',
        props<{ runway: AirportRunway }>()
    );


    public static readonly changeDestinationAirportWeatherFactors = createAction(
        '[Plan Performance Tab] Change Destination Airport Weather Factors',
        props<{ weatherFactors: PlanPerfWeatherFactorsState }>()
    );


    public static readonly changeDestinationAirportRunwayFactors = createAction(
        '[Plan Performance Tab] Change Destination Airport Runway Factors',
        props<{ runwayFactors: PlanPerfRwyFactorsState }>()
    );


    public static readonly changeAlternateAirport = createAction(
        '[Plan Performance Effects] Change Alternate Airport',
        props<{ airport: Airport }>()
    );


    public static readonly changeAlternateAirportRunway = createAction(
        '[Plan Performance Tab] Change Alternate Runway',
        props<{ runway: AirportRunway }>()
    );


    public static readonly changeAlternateAirportWeatherFactors = createAction(
        '[Plan Performance Tab] Change Alternate Airport Weather Factors',
        props<{ weatherFactors: PlanPerfWeatherFactorsState }>()
    );


    public static readonly changeAlternateAirportRunwayFactors = createAction(
        '[Plan Performance Tab] Change Alternate Airport Runway Factors',
        props<{ runwayFactors: PlanPerfRwyFactorsState }>()
    );
}
