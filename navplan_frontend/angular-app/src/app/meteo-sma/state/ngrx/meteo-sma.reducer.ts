import {MeteoSmaActions} from './meteo-sma.actions';
import {createReducer, on} from '@ngrx/store';
import {MeteoSmaState} from '../../domain/model/meteo-sma-state';
import {MeteoSmaStatus} from '../../domain/model/meteo-sma-status';


const initialState: MeteoSmaState = {
    status: MeteoSmaStatus.OFF,
    zoom: undefined,
    smaMeasurements: [],
};


export const meteoSmaReducer = createReducer(
    initialState,
    on(MeteoSmaActions.open, (state, action) => ({
        ...state,
        status: MeteoSmaStatus.WAITING,
    })),
    on(MeteoSmaActions.readSuccess, (state, action) => ({
        ...state,
        status: MeteoSmaStatus.CURRENT,
        smaMeasurements: action.smaMeasurements,
        zoom: action.zoom
    })),
    on(MeteoSmaActions.readError, (state) => ({
        ...state,
        status: MeteoSmaStatus.ERROR,
    })),
    on(MeteoSmaActions.close, (state) => ({
        ...state,
        status: MeteoSmaStatus.OFF,
        smaMeasurements: []
    })),
);
