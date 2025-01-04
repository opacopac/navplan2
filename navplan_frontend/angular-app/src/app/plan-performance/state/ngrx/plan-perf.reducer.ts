import {createReducer, on} from '@ngrx/store';
import {PlanPerfState} from '../state-model/plan-perf-state';
import {PlanPerfActions} from './plan-perf.actions';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {PlanPerfWeatherFactorsState} from '../state-model/plan-perf-weather-factors-state';
import {AtmosphereService} from '../../../geo-physics/domain/service/meteo/atmosphere.service';


export const initialWeatherFactors: PlanPerfWeatherFactorsState = {
    qnh: AtmosphereService.getStandardPressureAtSeaLevel(),
    oat: AtmosphereService.getStandardTemperatureAtSeaLevel(),
    pressureAltitude: null,
    densityAltitude: null,
    isaTemperature: null
};
export const initialRunwayFactors = {
    isGrassRwy: false,
    isWetRwy: false,
    rwySlopePercent: 0,
    rwyWind: Speed.ofZero(),
    reservePercent: 0
};
const initialState: PlanPerfState = {
    airportStates: []
};


export const planPerfReducer = createReducer(
        initialState,

        on(PlanPerfActions.setAirports, (state, action) => ({
            ...state,
            airportStates: action.airportStates
        })),

        on(PlanPerfActions.changeAirportRunway, (state, action) => ({
            ...state,
            airportStates: state.airportStates.map((adState, index) => index === action.adIndex
                ? {...adState, runway: action.runway}
                : adState
            )
        })),

        on(PlanPerfActions.changeAirportWeatherFactorsSuccess, (state, action) => ({
            ...state,
            airportStates: state.airportStates.map((adState, index) => index === action.adIndex
                ? {...adState, weatherFactors: action.weatherFactors}
                : adState
            )
        })),

        on(PlanPerfActions.changeAirportRunwayFactorsSuccess, (state, action) => ({
            ...state,
            airportStates: state.airportStates.map((adState, index) => index === action.adIndex
                ? {...adState, runwayFactors: action.runwayFactors}
                : adState
            )
        })),
    )
;
