import {MeteoDwdActions} from './meteo-dwd.actions';
import {createReducer, on} from '@ngrx/store';
import {MeteoDwdState} from '../model/meteo-dwd-state';
import {MeteoDwdStatus} from '../../domain/model/meteo-dwd-status';
import {MeteoDwdLayer} from '../../domain/model/meteo-dwd-layer';


const initialState: MeteoDwdState = {
    status: MeteoDwdStatus.OFF,
    showLayer: undefined,
    forecastRun: undefined,
    selectedStep: 1,
    mapTilesUrl: '',
    weatherValues: undefined,
    windValues: undefined,
    meteogramSteps: undefined
};


export const meteoDwdReducer = createReducer(
    initialState,

    on(MeteoDwdActions.open, (state) => ({
        ...state,
        status: MeteoDwdStatus.CURRENT,
        showLayer: MeteoDwdLayer.WeatherLayer,
    })),

    on(MeteoDwdActions.close, (state) => ({
        ...state,
        status: MeteoDwdStatus.OFF,
        showLayer: undefined,
    })),

    on(MeteoDwdActions.selectWeatherForecast, (state) => ({
        ...state,
        showWeatherForecast: true,
        showLayer: MeteoDwdLayer.WeatherLayer,
    })),

    on(MeteoDwdActions.selectWindForecast, (state) => ({
        ...state,
        showLayer: MeteoDwdLayer.WindLayer,
    })),

    on(MeteoDwdActions.previousStep, (state, action) => {
        const selectedStep = state.selectedStep !== undefined && state.selectedStep > state.forecastRun.model.minStep
            ? state.selectedStep - 1
            : state.selectedStep;

        return {
            ...state,
            selectedStep: selectedStep
        };
    }),

    on(MeteoDwdActions.nextStep, (state, action) => {
        const selectedStep = state.selectedStep !== undefined && state.selectedStep < state.forecastRun.model.maxStep
            ? state.selectedStep + 1
            : state.selectedStep;

        return {
            ...state,
            selectedStep: selectedStep
        };
    }),

    on(MeteoDwdActions.selectStep, (state, action) => ({
        ...state,
        selectedStep: action.step,
    })),

    on(MeteoDwdActions.readAvailableForecastRunsSuccess, (state, action) => {
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

    on(MeteoDwdActions.readMapTilesUrlSuccess, (state, action) => ({
        ...state,
        mapTilesUrl: action.mapTilesUrl,
    })),

    on(MeteoDwdActions.readWeatherValuesSuccess, (state, action) => ({
        ...state,
        weatherValues: action.weatherValues,
    })),

    on(MeteoDwdActions.readWindValuesSuccess, (state, action) => ({
        ...state,
        windValues: action.windValues,
    })),

    on(MeteoDwdActions.readCloudMeteogramSuccess, (state, action) => ({
        ...state,
        meteogramSteps: action.cloudMeteogramSteps,
    })),
);
