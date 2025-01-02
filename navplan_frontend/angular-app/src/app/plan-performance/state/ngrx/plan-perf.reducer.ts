import {createReducer, on} from '@ngrx/store';
import {PlanPerfState} from '../state-model/plan-perf-state';
import {PlanPerfActions} from './plan-perf.actions';
import {MockAirportLszb} from '../../../aerodrome/domain/mock/mock-airport-lszb';
import {MockRwyLszb14} from '../../../aerodrome/domain/mock/mock-rwy-lszb-14';
import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {MockRwyLszb32} from '../../../aerodrome/domain/mock/mock-rwy-lszb-32';


const initialState: PlanPerfState = {
    departureAirportState: {
        airport: MockAirportLszb.create(),
        runway: MockRwyLszb14.create(),
        aircraftPerfProfileIdx: 0,
        weatherFactors: {qnh: Pressure.ofHpa(1013), oat: Temperature.ofC(15)},
        rwyFactors: {
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
        rwyFactors: {
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
        rwyFactors: {
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

    on(PlanPerfActions.selectRunway, (state, action) => ({
        ...state,
        // departureAirportState: null
    })),
);
