import {FlightMapState} from '../domain-model/flight-map-state';
import {FlightMapActions} from './flight-map.actions';
import {createReducer, on} from '@ngrx/store';


const initialState: FlightMapState = {
    showOverlay: { dataItem: undefined, clickPos: undefined, metarTaf: undefined, notams: [], tabIndex: 0 },
};


export const flightMapReducer = createReducer(
    initialState,
    on(FlightMapActions.showOverlay, (state, action) => ({
        ...state,
        showOverlay: {
            dataItem: action.dataItem,
            clickPos: action.clickPos,
            metarTaf: action.metarTaf,
            notams: action.notams,
            tabIndex: action.tabIndex
        }
    })),
    on(FlightMapActions.closeAllOverlays, (state) => ({
        ...state,
        showOverlay: initialState.showOverlay
    })),
);
