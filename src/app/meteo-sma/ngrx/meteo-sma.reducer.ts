import {MeteoSmaActions} from './meteo-sma.actions';
import {createReducer, on} from '@ngrx/store';
import {MeteoSmaState} from '../domain-model/meteo-sma-state';
import {MeteoSmaButtonStatus} from '../domain-model/meteo-sma-button-status';


const initialState: MeteoSmaState = {
    buttonStatus: MeteoSmaButtonStatus.OFF,
    zoom: undefined,
    smaMeasurements: [],
};


export const meteoSmaReducer = createReducer(
    initialState,
    on(MeteoSmaActions.read, (state, action) => ({
        ...state,
        buttonStatus: MeteoSmaButtonStatus.WAITING,
    })),
    on(MeteoSmaActions.readSuccess, (state, action) => ({
        ...state,
        buttonStatus: MeteoSmaButtonStatus.CURRENT,
        smaMeasurements: action.smaMeasurements,
        zoom: action.zoom
    })),
    on(MeteoSmaActions.readError, (state) => ({
        ...state,
        buttonStatus: MeteoSmaButtonStatus.ERROR,
    })),
    on(MeteoSmaActions.close, (state) => ({
        ...state,
        buttonStatus: MeteoSmaButtonStatus.OFF,
        smaMeasurements: []
    })),
);
