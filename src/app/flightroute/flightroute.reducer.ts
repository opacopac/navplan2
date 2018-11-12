import {FlightrouteState} from './flightroute-state';
import {FlightrouteActions, FlightrouteActionTypes} from './flightroute.actions';
import {UserActions, UserActionTypes} from '../user/user.actions';
import {Aircraft} from './model/aircraft';
import {Flightroute} from './model/flightroute';
import {Speed} from '../shared/model/quantities/speed';
import {ConsumptionUnit, LengthUnit, SpeedUnit, TimeUnit, VolumeUnit} from '../shared/model/units';
import {Consumption} from '../shared/model/quantities/consumption';
import {Time} from '../shared/model/quantities/time';
import {FlightrouteCalcService} from './services/flightroute-calc/flightroute-calc.service';
import {ArrayService} from '../shared/services/array/array.service';


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
    distanceUnit: LengthUnit.NM,
    speedUnit: SpeedUnit.KT,
    altitudeUnit: LengthUnit.FT,
    fuelUnit: VolumeUnit.L,
    consumptionUnit: ConsumptionUnit.L_PER_H
};


export type FlightrouteWaypointUserActions = FlightrouteActions
    | UserActions;


export function flightrouteReducer(
    state: FlightrouteState = initialState,
    action: FlightrouteWaypointUserActions) {

    let newAircraft: Aircraft;
    let newFlightroute: Flightroute;

    switch (action.type) {
        case FlightrouteActionTypes.FLIGHTROUTE_LIST_READ_SUCCESS:
            return { ...state, flightrouteList: action.flightrouteList };

        case UserActionTypes.USER_LOGOUT:
            return { ...state, flightrouteList: undefined };

        case FlightrouteActionTypes.FLIGHTROUTE_READ_SUCCESS:
            newFlightroute = action.flightroute.clone();
            FlightrouteCalcService.calcFlightRoute(newFlightroute);
            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.FLIGHTROUTE_SAVE_SUCCESS:
            return { ...state, flightroute: action.flightroute };

        case FlightrouteActionTypes.SHARED_FLIGHTROUTE_READ_SUCCESS:
            return { ...state, flightroute: action.flightroute };

        case FlightrouteActionTypes.SHARED_FLIGHTROUTE_CREATE_SUCCESS:
            return { ...state, showShareId: action.shareId };

        case FlightrouteActionTypes.SHARED_FLIGHTROUTE_HIDE_URL:
            return { ...state, showShareId: false };

        case FlightrouteActionTypes.FLIGHTROUTE_UPDATE_COMMENTS:
            newFlightroute = state.flightroute.clone();
            newFlightroute.comments = action.comments;
            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.FLIGHTROUTE_UPDATE_EXTRA_TIME:
            newFlightroute = state.flightroute.clone();
            newFlightroute.extraTime = new Time(action.extraTimeMinutesValue, TimeUnit.M);
            FlightrouteCalcService.calcFlightRoute(newFlightroute);

            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.FLIGHTROUTE_UPDATE_AIRCRAFT_SPEED:
            newAircraft = state.flightroute.aircraft.clone();
            newAircraft.speed = new Speed(action.aircraftSpeedValue, state.speedUnit);
            newFlightroute = state.flightroute.clone();
            newFlightroute.aircraft = newAircraft;
            FlightrouteCalcService.calcFlightRoute(newFlightroute);
            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.FLIGHTROUTE_UPDATE_AIRCRAFT_CONSUMPTION:
            newAircraft = state.flightroute.aircraft.clone();
            newAircraft.consumption = new Consumption(action.aircraftConsumptionValue, state.consumptionUnit);
            newFlightroute = state.flightroute.clone();
            newFlightroute.aircraft = newAircraft;
            FlightrouteCalcService.calcFlightRoute(newFlightroute);
            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.WAYPOINTS_EDIT:
            return { ...state, editWaypoint: action.waypoint };

        case FlightrouteActionTypes.WAYPOINTS_EDIT_CANCEL:
            return { ...state, editWaypoint: undefined };

        case FlightrouteActionTypes.WAYPOINTS_INSERT:
            newFlightroute = state.flightroute.clone();
            ArrayService.insertAt(newFlightroute.waypoints, action.index, action.newWaypoint);
            FlightrouteCalcService.calcFlightRoute(newFlightroute);
            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.WAYPOINTS_REPLACE:
            newFlightroute = state.flightroute.clone();
            newFlightroute.waypoints[action.index] = action.newWaypoint;
            FlightrouteCalcService.calcFlightRoute(newFlightroute);
            return { ...state, flightroute: newFlightroute };

        case FlightrouteActionTypes.WAYPOINTS_DELETE:
            newFlightroute = state.flightroute.clone();
            const idx = state.flightroute.waypoints.indexOf(action.waypoint);
            ArrayService.removeAt(newFlightroute.waypoints, idx);
            FlightrouteCalcService.calcFlightRoute(newFlightroute);
            return { ...state, flightroute: newFlightroute };

        default:
            return state;
    }
}
