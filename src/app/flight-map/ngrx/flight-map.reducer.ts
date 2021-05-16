import {FlightMapState} from '../domain-model/flight-map-state';
import {FlightMapActions} from './flight-map.actions';
import {createReducer, on} from '@ngrx/store';


const initialState: FlightMapState = {
    showAirportOverlay: { airport: undefined, metarTaf: undefined, notams: [], tabIndex: 0 },
    showOverlay: { dataItem: undefined, clickPos: undefined },
};


export const flightMapReducer = createReducer(
    initialState,
    on(FlightMapActions.showAirportOverlay, (state, action) => ({
        ...state,
        showAirportOverlay: { airport: action.airport, metarTaf: action.metarTaf, notams: action.notams, tabIndex: action.tabIndex }
    })),
    on(FlightMapActions.showOverlay, (state, action) => ({
        ...state,
        showOverlay: { dataItem: action.dataItem, clickPos: action.clickPos }
    })),
    on(FlightMapActions.closeAllOverlays, (state) => ({
        ...state,
        showOverlay: { dataItem: undefined, clickPos: undefined },
        showAirportOverlay: { airport: undefined, metarTaf: undefined, notams: [], tabIndex: 0 },
    })),
);
