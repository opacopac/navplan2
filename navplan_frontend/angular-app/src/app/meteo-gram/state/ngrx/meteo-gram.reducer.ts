import {createReducer, on} from '@ngrx/store';
import {MeteoGramState} from '../model/meteo-gram-state';
import {MeteoGramActions} from './meteo-gram.actions';


const initialState: MeteoGramState = {
    cloudMeteogram: undefined
};


export const meteoGramReducer = createReducer(
    initialState,
    on(MeteoGramActions.readCloudMeteogramSuccess, (state, action) => ({
        ...state,
        cloudMeteogram: action.cloudMeteogram,
    })),
);
