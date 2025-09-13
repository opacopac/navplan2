import {MeteoForecastActions} from './meteo-forecast.actions';
import {createReducer, on} from '@ngrx/store';
import {MeteoForecastState} from '../model/meteo-forecast-state';
import {MeteoForecastStatus} from '../../domain/model/meteo-forecast-status';
import {MeteoForecastLayer} from '../../domain/model/meteo-forecast-layer';


const initialState: MeteoForecastState = {
    status: MeteoForecastStatus.OFF,
    showLayer: undefined,
    forecastRun: undefined,
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
        const selectedStep = state.selectedStep !== undefined && state.selectedStep > state.forecastRun.model.minStep
            ? state.selectedStep - 1
            : state.selectedStep;

        return {
            ...state,
            selectedStep: selectedStep
        };
    }),

    on(MeteoForecastActions.nextStep, (state, action) => {
        const selectedStep = state.selectedStep !== undefined && state.selectedStep < state.forecastRun.model.maxStep
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

    on(MeteoForecastActions.readAvailableForecastRunsSuccess, (state, action) => {
        const latestRun = action.forecastRuns && action.forecastRuns.length > 0
            ? action.forecastRuns[action.forecastRuns.length - 1]
            : undefined;
        const selectedStep = latestRun && (state.selectedStep === undefined
            || state.selectedStep < latestRun.model.minStep || state.selectedStep > latestRun.model.maxStep)
            ? latestRun.model.minStep
            : state.selectedStep;

        return {
            ...state,
            forecastRun: latestRun,
            selectedStep: selectedStep
        };
    }),

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
