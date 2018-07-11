import {FlightrouteState} from './model/flightroute-state';
import {FlightrouteActions, FlightrouteActionTypes} from './flightroute.actions';
import {UserActions, UserActionTypes} from '../user/user.actions';
import {WaypointActionTypes, WaypointsActions} from './waypoints.actions';
import {Aircraft} from './model/aircraft';
import {Flightroute} from './model/flightroute';
import {Speed} from '../shared/model/quantities/speed';
import {ConsumptionUnit, SpeedUnit, TimeUnit} from '../shared/model/units';
import {Consumption} from '../shared/model/quantities/consumption';
import {Time} from '../shared/model/quantities/time';
import {WaypointsReducer} from './waypoints.reducer';


const initialState: FlightrouteState = {
    flightrouteList: [],
    flightroute: new Flightroute(
        -1,
        '',
        '',
        new Aircraft(
            new Speed(100, SpeedUnit.KT),
            new Consumption(20, ConsumptionUnit.L_PER_H)
        ),
        [],
        undefined,
        new Time(0, TimeUnit.M)
    ),
    editWaypoint: undefined,
    showShareId: undefined,
};


export function flightrouteReducer(
    state: FlightrouteState = initialState,
    action: FlightrouteActions
        | WaypointsActions
        | UserActions) {

    let newAircraft: Aircraft;
    let newFlightroute: Flightroute;

    switch (action.type) {
        case FlightrouteActionTypes.FLIGHTROUTE_LIST_READ_SUCCESS:
            return { ...state, flightrouteList: action.flightrouteList };

        case UserActionTypes.USER_LOGOUT:
            return { ...state, flightrouteList: undefined };

        case FlightrouteActionTypes.FLIGHTROUTE_READ_SUCCESS:
            newFlightroute = action.flightroute;
            newFlightroute.waypoints = WaypointsReducer.calcWaypointList(action.flightroute);
            newFlightroute.alternate = WaypointsReducer.calcAlternate(action.flightroute);
            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.FLIGHTROUTE_SAVE_SUCCESS:
            return { ...state, flightroute: action.flightroute };

        case FlightrouteActionTypes.FLIGHTROUTE_READ_SHARED_SUCCESS:
            return { ...state, flightroute: action.flightroute };

        case FlightrouteActionTypes.FLIGHTROUTE_CREATE_SHARED_SUCCESS:
            return { ...state, showShareId: action.shareId };

        case FlightrouteActionTypes.FLIGHTROUTE_HIDE_SHARED_URL:
            return { ...state, showShareId: false };

        case FlightrouteActionTypes.FLIGHTROUTE_UPDATE_COMMENTS:
            newFlightroute = state.flightroute.clone();
            newFlightroute.comments = action.comments;
            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.FLIGHTROUTE_UPDATE_EXTRA_TIME:
            newFlightroute = state.flightroute.clone();
            newFlightroute.extraTime = new Time(action.extraTimeValue, TimeUnit.M); // TODO
            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.FLIGHTROUTE_UPDATE_AIRCRAFT_SPEED:
            newAircraft = state.flightroute.aircraft.clone();
            newAircraft.speed = new Speed(action.aircraftSpeedValue, SpeedUnit.KT); // TODO
            newFlightroute = state.flightroute.clone();
            newFlightroute.aircraft = newAircraft;
            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.FLIGHTROUTE_UPDATE_AIRCRAFT_CONSUMPTION:
            newAircraft = state.flightroute.aircraft.clone();
            newAircraft.consumption = new Consumption(action.aircraftConsumptionValue, ConsumptionUnit.L_PER_H); // TODO
            newFlightroute = state.flightroute.clone();
            newFlightroute.aircraft = newAircraft;
            return { ...state, flightroute: newFlightroute };

        case WaypointActionTypes.WAYPOINTS_EDIT:
            return { ...state, editWaypoint: action.waypoint };

        case WaypointActionTypes.WAYPOINTS_EDIT_CANCEL:
            return { ...state, editWaypoint: undefined };

        default:
            return state;
    }
}
