import {FlightMapState} from './flight-map-state';
import {FlightMapActions, FlightMapActionTypes} from './flight-map.actions';
import {AirportActions, AirportActionTypes} from '../../airport/ngrx/airport-actions';
import {AirspaceActions, AirspaceActionTypes} from '../../airspace/ngrx/airspace-actions';
import {NavaidActions, NavaidActionTypes} from '../../navaid/ngrx/navaid-actions';
import {WebcamActions, WebcamActionTypes} from '../../webcam/ngrx/webcam-actions';


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


export function flightMapReducer(
    state: FlightMapState = initialState,
    action: FlightMapActions | AirportActions | AirspaceActions | NavaidActions | WebcamActions
) {
    switch (action.type) {
        case AirportActionTypes.READ_ADS_BY_EXTENT_SUCCESS:
            return { ...state, airports: action.airports };
        case AirportActionTypes.READ_REPORTING_POINTS_BY_EXTENT_SUCCESS:
            return { ...state, reportingPoints: action.reportingPoints, reportingSector: action.reportingSectors };
        case AirportActionTypes.READ_AD_CIRCUITS_BY_EXTENT_SUCCESS:
            return { ...state, airportCircuits: action.airportCircuits };
        case AirportActionTypes.READ_AD_BY_ID_SUCCESS:
            return { ...state, showAirportOverlay: action.airport };
        case AirportActionTypes.READ_REPORTING_POINT_SUCCESS:
            return { ...state, showReportingPointOverlay: action.reportingPoint };
        case AirportActionTypes.READ_REPORTING_SECTOR_SUCCESS:
            return { ...state, showReportingSectorOverlay: action.reportingSector };
        case AirspaceActionTypes.READ_AIRSPACE_BY_EXTENT_SUCCESS:
            return { ...state, airspaces: action.airspaces };
        case NavaidActionTypes.READ_NAVAID_BY_EXTENT_SUCCESS:
            return { ...state, navaids: action.navaids };
        case WebcamActionTypes.READ_WEBCAMS_BY_EXTENT_SUCCESS:
            return { ...state, webcams: action.webcams };
        case FlightMapActionTypes.FLIGHT_MAP_CLOSE_ALL_OVERLAYS:
            return { ...state,
                showAirportOverlay: undefined,
                showReportingPointOverlay: undefined,
                showReportingSectorOverlay: undefined
            };
        default:
            return state;
    }
}
