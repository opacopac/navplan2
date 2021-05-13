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
    showAirportOverlay: undefined,
    showReportingPointOverlay: undefined,
    showReportingSectorOverlay: undefined,
    showNavaidOverlay: undefined,
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
    on(FlightMapActions.showAirportOverlay, (state, action) => ({
        ...state,
        showAirportOverlay: action.airport,
        showReportingPointOverlay: undefined,
        showReportingSectorOverlay: undefined,
        showNavaidOverlay: undefined
    })),
    on(FlightMapActions.showReportingPointOverlay, (state, action) => ({
        ...state,
        showReportingPointOverlay: action.reportingPoint,
        showAirportOverlay: undefined,
        showReportingSectorOverlay: undefined,
        showNavaidOverlay: undefined
    })),
    on(FlightMapActions.showReportingSectorOverlay, (state, action) => ({
        ...state,
        showReportingSectorOverlay: action.reportingSector,
        showAirportOverlay: undefined,
        showReportingPointOverlay: undefined,
        showNavaidOverlay: undefined
    })),
    on(FlightMapActions.showNavaidOverlay, (state, action) => ({
        ...state,
        showNavaidOverlay: action.navaid,
        showAirportOverlay: undefined,
        showReportingPointOverlay: undefined,
        showReportingSectorOverlay: undefined,
    })),
    on(FlightMapActions.closeAllOverlays, (state) => ({
        ...state,
        showAirportOverlay: undefined,
        showReportingPointOverlay: undefined,
        showReportingSectorOverlay: undefined,
        showNavaidOverlay: undefined
    })),
);
