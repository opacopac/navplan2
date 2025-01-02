import {createReducer, on} from '@ngrx/store';
import {PlanPerfState} from '../state-model/plan-perf-state';
import {PlanPerfActions} from './plan-perf.actions';
import {MockAirportLszb} from '../../../aerodrome/domain/mock/mock-airport-lszb';
import {MockRwyLszb14} from '../../../aerodrome/domain/mock/mock-rwy-lszb-14';
import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {MockRwyLszb32} from '../../../aerodrome/domain/mock/mock-rwy-lszb-32';


// TODO: initial state
const initialState: PlanPerfState = {
    departureAirportState: {
        airport: MockAirportLszb.create(),
        runway: MockRwyLszb14.create(),
        aircraftPerfProfileIdx: 0,
        weatherFactors: {qnh: Pressure.ofHpa(1013), oat: Temperature.ofC(15)},
        runwayFactors: {
            isGrassRwy: false,
            isWetRwy: false,
            rwySlopePercent: 0,
            rwyWind: Speed.ofZero(),
            reservePercent: 0
        },
    },
    destinationAirportState: {
        airport: MockAirportLszb.create(),
        runway: MockRwyLszb32.create(),
        aircraftPerfProfileIdx: 0,
        weatherFactors: {qnh: Pressure.ofHpa(1013), oat: Temperature.ofC(15)},
        runwayFactors: {
            isGrassRwy: false,
            isWetRwy: false,
            rwySlopePercent: 0,
            rwyWind: Speed.ofZero(),
            reservePercent: 0
        },
    },
    alternateAirportState: {
        airport: null,
        runway: null,
        aircraftPerfProfileIdx: 0,
        weatherFactors: {qnh: Pressure.ofHpa(1013), oat: Temperature.ofC(15)},
        runwayFactors: {
            isGrassRwy: false,
            isWetRwy: false,
            rwySlopePercent: 0,
            rwyWind: Speed.ofZero(),
            reservePercent: 0
        },
    },
};


export const planPerfReducer = createReducer(
    initialState,

    on(PlanPerfActions.changeDepartureAirportPerformance, (state, action) => ({
        ...state,
        departureAirportState: action.airportPerformance
    })),

    on(PlanPerfActions.changeDestinationAirportPerformance, (state, action) => ({
        ...state,
        destinationAirportState: action.airportPerformance
    })),

    on(PlanPerfActions.changeAlternateAirportPerformance, (state, action) => ({
        ...state,
        alternateAirportState: action.airportPerformance
    }))
);
