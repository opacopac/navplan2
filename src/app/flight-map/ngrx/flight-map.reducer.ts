import {FlightMapState} from './flight-map-state';
import {FlightMapActions, FlightMapActionTypes} from './flight-map.actions';


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
    showReportingSectorOverlay: undefined
};


export function flightMapReducer(state: FlightMapState = initialState, action: FlightMapActions) {
    switch (action.type) {
        case FlightMapActionTypes.SHOW_AIRPORTS_ON_MAP:
            return { ...state, airports: action.airports };
        case FlightMapActionTypes.SHOW_REPORTING_POINTS_ON_MAP:
            return { ...state, reportingPoints: action.reportingPoints, reportingSector: action.reportingSectors };
        case FlightMapActionTypes.SHOW_CIRCUITS_ON_MAP:
            return { ...state, airportCircuits: action.airportCircuits };
        case FlightMapActionTypes.SHOW_AIRPORT_MAP_OVERLAY:
            return { ...state, showAirportOverlay: action.airport };
        case FlightMapActionTypes.SHOW_REPORTING_POINT_MAP_OVERLAY:
            return { ...state, showReportingPointOverlay: action.reportingPoint };
        case FlightMapActionTypes.SHOW_REPORTING_SECTOR_MAP_OVERLAY:
            return { ...state, showReportingSectorOverlay: action.reportingSector };
        case FlightMapActionTypes.SHOW_AIRSPACES_ON_MAP:
            return { ...state, airspaces: action.airspaces };
        case FlightMapActionTypes.SHOW_NAVAIDS_ON_MAP:
            return { ...state, navaids: action.navaids };
        case FlightMapActionTypes.SHOW_WEBCAMS_ON_MAP:
            return { ...state, webcams: action.webcams };
        case FlightMapActionTypes.CLOSE_ALL_OVERLAYS:
            return { ...state,
                showAirportOverlay: undefined,
                showReportingPointOverlay: undefined,
                showReportingSectorOverlay: undefined
            };
        default:
            return state;
    }
}
