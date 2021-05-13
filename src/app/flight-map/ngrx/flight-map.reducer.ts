import {FlightMapState} from './flight-map-state';
import {FlightMapActions} from './flight-map.actions';
import {createReducer, on} from '@ngrx/store';


const initialState: FlightMapState = {
    airports: [],
    airportCircuits: [],
    reportingPoints: [],
    reportingSector: [],
    airspaces: [],
    navaids: [],
    webcams: [],
    showOverlay: { dataItem: undefined, clickPos: undefined },
};


export const flightMapReducer = createReducer(
    initialState,
    on(FlightMapActions.showAirports, (state, action) => ({
        ...state,
        airports: action.airports
    })),
    on(FlightMapActions.showReportingPoints, (state, action) => ({
        ...state,
        reportingPoints: action.reportingPoints,
        reportingSector: action.reportingSectors
    })),
    on(FlightMapActions.showCircuits, (state, action) => ({
        ...state,
        airportCircuits: action.airportCircuits
    })),
    on(FlightMapActions.showAirspaces, (state, action) => ({
        ...state,
        airspaces: action.airspaces
    })),
    on(FlightMapActions.showNavaids, (state, action) => ({
        ...state,
        navaids: action.navaids
    })),
    on(FlightMapActions.showWebcams, (state, action) => ({
        ...state,
        webcams: action.webcams
    })),
    on(FlightMapActions.showOverlay, (state, action) => ({
        ...state,
        showOverlay: action
    })),
    on(FlightMapActions.closeAllOverlays, (state) => ({
        ...state,
        showOverlay: { dataItem: undefined, clickPos: undefined }
    })),
);
