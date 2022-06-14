import {MeteoDwdActions} from './meteo-dwd.actions';
import {createReducer, on} from '@ngrx/store';
import {MeteoDwdState} from '../../domain/model/meteo-dwd-state';
import {MeteoDwdButtonStatus} from '../../domain/model/meteo-dwd-button-status';


const initialState: MeteoDwdState = {
    buttonStatus: MeteoDwdButtonStatus.OFF,
    showWeatherForecast: false,
    showWindForecast: false,
    selectedInterval: 0,
    weatherGrid: undefined,
    windGrid: undefined
};


export const meteoDwdReducer = createReducer(
    initialState,

    on(MeteoDwdActions.open, (state) => ({
        ...state,
        buttonStatus: MeteoDwdButtonStatus.CURRENT,
        showWeatherForecast: true,
        showWindForecast: false,
    })),

    on(MeteoDwdActions.close, (state) => ({
        ...state,
        buttonStatus: MeteoDwdButtonStatus.OFF,
        showWeatherForecast: false,
        showWindForecast: false,
    })),

    on(MeteoDwdActions.selectWeatherForecast, (state) => ({
        ...state,
        showWeatherForecast: true,
        showWindForecast: false,
    })),

    on(MeteoDwdActions.selectWindForecast, (state) => ({
        ...state,
        showWeatherForecast: false,
        showWindForecast: true,
    })),

    on(MeteoDwdActions.selectInterval, (state, action) => ({
        ...state,
        selectedInterval: action.interval,
    })),

    on(MeteoDwdActions.readWeatherGridSuccess, (state, action) => ({
        ...state,
        weatherGrid: action.weatherGrid,
    })),

    on(MeteoDwdActions.readWindGridSuccess, (state, action) => ({
        ...state,
        windGrid: action.windGrid,
    })),
);
