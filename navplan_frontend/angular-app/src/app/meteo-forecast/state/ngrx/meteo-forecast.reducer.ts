import {MeteoForecastActions} from './meteo-forecast.actions';
import {createReducer, on} from '@ngrx/store';
import {MeteoForecastState} from '../model/meteo-forecast-state';
import {MeteoForecastStatus} from '../../domain/model/meteo-forecast-status';
import {MeteoForecastLayer} from '../../domain/model/meteo-forecast-layer';


const initialState: MeteoForecastState = {
    status: MeteoForecastStatus.OFF,
    showLayer: undefined,
    availableFcRuns: [],
    selectedFcRun: undefined,
    selectedStep: 1,
    mapTilesUrl: '',
    weatherValues: undefined,
    windValues: undefined
};


export const meteoForecastReducer = createReducer(
    initialState,

    on(MeteoForecastActions.open, (state) => ({
        ...state,
        status: MeteoForecastStatus.CURRENT,
        showLayer: MeteoForecastLayer.WeatherLayer,
    })),

    on(MeteoForecastActions.close, (state) => ({
        ...state,
        status: MeteoForecastStatus.OFF,
        showLayer: undefined,
    })),

    on(MeteoForecastActions.selectWeatherForecast, (state) => ({
        ...state,
        showWeatherForecast: true,
        showLayer: MeteoForecastLayer.WeatherLayer,
    })),

    on(MeteoForecastActions.selectWindForecast, (state) => ({
        ...state,
        showLayer: MeteoForecastLayer.WindLayer,
    })),

    on(MeteoForecastActions.previousStep, (state, action) => {
        const selectedStep = state.selectedStep !== undefined && state.selectedStep > state.selectedFcRun.model.minStep
            ? state.selectedStep - 1
            : state.selectedStep;

        return {
            ...state,
            selectedStep: selectedStep
        };
    }),

    on(MeteoForecastActions.nextStep, (state, action) => {
        const selectedStep = state.selectedStep !== undefined && state.selectedStep < state.selectedFcRun.model.maxStep
            ? state.selectedStep + 1
            : state.selectedStep;

        return {
            ...state,
            selectedStep: selectedStep
        };
    }),

    on(MeteoForecastActions.selectStep, (state, action) => ({
        ...state,
        selectedStep: action.step,
    })),

    on(MeteoForecastActions.readAvailableForecastRunsSuccess, (state, action) => ({
        ...state,
        availableFcRuns: action.forecastRuns
    })),

    on(MeteoForecastActions.changeForecastRun, (state, action) => ({
        ...state,
        selectedFcRun: action.forecastRun,
        selectedStep: action.forecastRun.model.minStep
    })),

    on(MeteoForecastActions.readMapTilesUrlSuccess, (state, action) => ({
        ...state,
        mapTilesUrl: action.mapTilesUrl,
    })),

    on(MeteoForecastActions.readWeatherValuesSuccess, (state, action) => ({
        ...state,
        weatherValues: action.weatherValues,
    })),

    on(MeteoForecastActions.readWindValuesSuccess, (state, action) => ({
        ...state,
        windValues: action.windValues,
    })),
);
