import {createReducer, on} from '@ngrx/store';
import {MetarTafActions} from './metar-taf.actions';
import {MetarTafState} from '../state-model/metar-taf-state';


const initialState: MetarTafState = {
    extent: undefined,
    zoom: undefined,
    timestamp: 0,
    metarTafs: [],
};


export const metarTafReducer = createReducer(
    initialState,
    on(MetarTafActions.readSuccess, (state, action) => ({
        ...state,
        extent: action.extent,
        zoom: action.zoom,
        timestamp: action.timestamp,
        metarTafs: action.metarTafs
    })),
);
