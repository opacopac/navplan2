import {RouteMeteoActions} from './route-meteo.actions';
import {createReducer, on} from '@ngrx/store';
import {RouteMeteoState} from '../state-model/route-meteo-state';


const initialState: RouteMeteoState = {
    isVisible: false,
    extent: undefined,
    metarTafs: [],
};


export const routeMeteoReducer = createReducer(
    initialState,
    on(RouteMeteoActions.updateSuccess, (state, action) => ({
        ...state,
        extent: action.extent,
        metarTafs: action.metarTafList
    })),
);
