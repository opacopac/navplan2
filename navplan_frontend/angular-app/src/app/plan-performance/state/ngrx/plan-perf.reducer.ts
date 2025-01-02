import {createReducer, on} from '@ngrx/store';
import {PlanPerfState} from '../state-model/plan-perf-state';
import {PlanPerfActions} from './plan-perf.actions';
import {MockAirportLszb} from '../../../aerodrome/domain/mock/mock-airport-lszb';
import {MockRwyLszb14} from '../../../aerodrome/domain/mock/mock-rwy-lszb-14';
import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {MockRwyLszb32} from '../../../aerodrome/domain/mock/mock-rwy-lszb-32';
import {PlanPerfWeatherFactorsState} from '../state-model/plan-perf-weather-factors-state';


// TODO: initial state
const initialWeatherFactors: PlanPerfWeatherFactorsState = {
    qnh: Pressure.ofHpa(1013),
    oat: Temperature.ofC(15),
    pressureAltitude: null,
    densityAltitude: null,
    isaTemperature: null
};
const initialRunwayFactors = {
    isGrassRwy: false,
    isWetRwy: false,
    rwySlopePercent: 0,
    rwyWind: Speed.ofZero(),
    reservePercent: 0
};
const initialState: PlanPerfState = {
    departureAirportState: {
        airport: MockAirportLszb.create(),
        runway: MockRwyLszb14.create(),
        aircraftPerfProfileIdx: 0,
        weatherFactors: initialWeatherFactors,
        runwayFactors: initialRunwayFactors,
        tkofPerformance: null,
        ldaPerformance: null,
    },
    destinationAirportState: {
        airport: MockAirportLszb.create(),
        runway: MockRwyLszb32.create(),
        aircraftPerfProfileIdx: 0,
        weatherFactors: initialWeatherFactors,
        runwayFactors: initialRunwayFactors,
        tkofPerformance: null,
        ldaPerformance: null,
    },
    alternateAirportState: {
        airport: null,
        runway: null,
        aircraftPerfProfileIdx: 0,
        weatherFactors: initialWeatherFactors,
        runwayFactors: initialRunwayFactors,
        tkofPerformance: null,
        ldaPerformance: null,
    },
};


export const planPerfReducer = createReducer(
    initialState,

    on(PlanPerfActions.changeDepartureAirportRunway, (state, action) => ({
        ...state,
        departureAirportState: {
            ...state.departureAirportState,
            runway: action.runway
        }
    })),

    on(PlanPerfActions.changeDepartureAirportWeatherFactors, (state, action) => ({
        ...state,
        departureAirportState: {
            ...state.departureAirportState,
            weatherFactors: action.weatherFactors
        }
    })),

    on(PlanPerfActions.changeDepartureAirportRunwayFactors, (state, action) => ({
        ...state,
        departureAirportState: {
            ...state.departureAirportState,
            runwayFactors: action.runwayFactors
        }
    })),

    on(PlanPerfActions.changeDestinationAirportRunway, (state, action) => ({
        ...state,
        destinationAirportState: {
            ...state.destinationAirportState,
            runway: action.runway
        }
    })),

    on(PlanPerfActions.changeDestinationAirportWeatherFactors, (state, action) => ({
        ...state,
        destinationAirportState: {
            ...state.destinationAirportState,
            weatherFactors: action.weatherFactors
        }
    })),

    on(PlanPerfActions.changeDestinationAirportRunwayFactors, (state, action) => ({
        ...state,
        destinationAirportState: {
            ...state.destinationAirportState,
            runwayFactors: action.runwayFactors
        }
    })),

    on(PlanPerfActions.changeAlternateAirportRunway, (state, action) => ({
        ...state,
        alternateAirportState: {
            ...state.alternateAirportState,
            runway: action.runway
        }
    })),

    on(PlanPerfActions.changeAlternateAirportWeatherFactors, (state, action) => ({
        ...state,
        alternateAirportState: {
            ...state.alternateAirportState,
            weatherFactors: action.weatherFactors
        }
    })),

    on(PlanPerfActions.changeAlternateAirportRunwayFactors, (state, action) => ({
        ...state,
        alternateAirportState: {
            ...state.alternateAirportState,
            runwayFactors: action.runwayFactors
        }
    })),
);
