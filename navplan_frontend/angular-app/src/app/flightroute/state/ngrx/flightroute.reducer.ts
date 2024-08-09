import {FlightrouteState} from '../state-model/flightroute-state';
import {Aircraft} from '../../domain/model/aircraft';
import {Flightroute} from '../../domain/model/flightroute';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {TimeUnit} from '../../../geo-physics/domain/model/quantities/time-unit';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {FlightrouteCalcHelper} from '../../domain/service/flightroute-calc.helper';
import {createReducer, on} from '@ngrx/store';
import {SharedFlightRouteActions} from './shared-flight-route.actions';
import {WaypointActions} from './waypoints.actions';
import {ArrayHelper} from '../../../system/domain/service/array/array-helper';
import {SpeedUnit} from '../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../geo-physics/domain/model/quantities/consumption-unit';
import {FlightrouteActions} from './flightroute.actions';
import {FlightrouteListActions} from './flightroute-list.actions';
import {AircraftListActions} from '../../../aircraft/state/ngrx/aircraft-list.actions';


const initialState: FlightrouteState = {
    flightrouteList: [],
    flightroute: new Flightroute(
        -1,
        '',
        '',
        new Aircraft(
            new Speed(100, SpeedUnit.KT), // TODO: initial values from default aircraft
            new Consumption(25, ConsumptionUnit.L_PER_H)
        ),
        [],
        undefined,
        new Time(0, TimeUnit.M)
    ),
    selectedAircraft: undefined,
    useAircraftSpeedValue: false,
    useAircraftConsumptionValue: false,
    showShareId: undefined
};


export const flightRouteReducer = createReducer(
    initialState,

    // FlightrouteListActions
    on(FlightrouteListActions.showList, (state, action) => ({
        ...state,
        flightrouteList: action.flightrouteList
    })),

    // FlightrouteActions
    on(FlightrouteActions.update, (state, action) => {
        const newRouteAircraft = action.flightroute.aircraft.clone();
        newRouteAircraft.speed = state.useAircraftSpeedValue
            ? state.selectedAircraft.cruiseSpeed
            : newRouteAircraft.speed;
        newRouteAircraft.consumption = state.useAircraftConsumptionValue
            ? state.selectedAircraft.cruiseFuel
            : newRouteAircraft.consumption;
        const newFlightroute = action.flightroute.clone();
        newFlightroute.aircraft = newRouteAircraft;
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);

        return {
            ...state,
            flightroute: newFlightroute,
        };
    }),

    on(FlightrouteActions.clear, (state, action) => {
        return {
            ...state,
            flightroute: initialState.flightroute.clone()
        };
    }),

    // SharedFlightRouteActions
    on(SharedFlightRouteActions.saveSuccess, (state, action) => ({
        ...state,
        showShareId: action.shareId
    })),

    on(SharedFlightRouteActions.hideUrl, (state) => ({
        ...state,
        showShareId: undefined
    })),

    // FlightRouteParameterActions
    on(FlightrouteActions.updateTitle, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        newFlightroute.title = action.title;
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    on(FlightrouteActions.updateComments, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        newFlightroute.comments = action.comments;
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    on(FlightrouteActions.updateExtraTime, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        newFlightroute.extraTime = action.extraTime;
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    on(FlightrouteActions.updateCruiseSpeed, (state, action) => {
        const newRouteAircraft = state.flightroute.aircraft.clone();
        newRouteAircraft.speed = action.cruiseSpeed;
        const newFlightroute = state.flightroute.clone();
        newFlightroute.aircraft = newRouteAircraft;
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    on(FlightrouteActions.updateCruiseConsumption, (state, action) => {
        const newRouteAircraft = state.flightroute.aircraft.clone();
        newRouteAircraft.consumption = action.cruiseConsumption;
        const newFlightroute = state.flightroute.clone();
        newFlightroute.aircraft = newRouteAircraft;
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    // AircraftActions
    on(AircraftListActions.selectAircraftSuccess, (state, action) => {
        const newRouteAircraft = state.flightroute.aircraft.clone();
        newRouteAircraft.speed = action.aircraft.cruiseSpeed;
        newRouteAircraft.consumption = action.aircraft.cruiseFuel;
        const newFlightroute = state.flightroute.clone();
        newFlightroute.aircraft = newRouteAircraft;
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);

        return {
            ...state,
            flightroute: newFlightroute,
            useAircraftSpeedValue: true,
            useAircraftConsumptionValue: true,
            selectedAircraft: action.aircraft,
        };
    }),

    on(FlightrouteActions.updateUseAircraftSpeedValue, (state, action) => {
        const newRouteAircraft = state.flightroute.aircraft.clone();
        newRouteAircraft.speed = action.useAircraftSpeed
            ? state.selectedAircraft?.cruiseSpeed
            : newRouteAircraft.speed;
        const newFlightroute = state.flightroute.clone();
        newFlightroute.aircraft = newRouteAircraft;
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);

        return {
            ...state,
            flightroute: newFlightroute,
            useAircraftSpeedValue: action.useAircraftSpeed
        };
    }),

    on(FlightrouteActions.updateUseAircraftConsumptionValue, (state, action) => {
        const newRouteAircraft = state.flightroute.aircraft.clone();
        newRouteAircraft.consumption = action.useAircraftConsumption
            ? state.selectedAircraft?.cruiseFuel
            : newRouteAircraft.consumption;
        const newFlightroute = state.flightroute.clone();
        newFlightroute.aircraft = newRouteAircraft;
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);

        return {
            ...state,
            flightroute: newFlightroute,
            useAircraftConsumptionValue: action.useAircraftConsumption
        };
    }),

    // WaypointActions
    on(WaypointActions.insert, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        ArrayHelper.insertAt(newFlightroute.waypoints, action.index, action.newWaypoint.clone());
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    on(WaypointActions.update, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        const wpIndex = state.flightroute.getWaypointIndex(action.oldWp);
        newFlightroute.waypoints[wpIndex] = action.newWp.clone();
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    on(WaypointActions.replace, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        newFlightroute.waypoints[action.index] = action.newWaypoint.clone();
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    on(WaypointActions.delete, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        if (state.flightroute.isAlternateWaypoint(action.waypoint)) {
            newFlightroute.alternate = undefined;
        } else {
            const idx = state.flightroute.getWaypointIndex(action.waypoint);
            ArrayHelper.removeAt(newFlightroute.waypoints, idx);
        }
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);

        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    on(WaypointActions.reverse, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        newFlightroute.waypoints.reverse();
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    on(WaypointActions.setAlternate, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        newFlightroute.alternate = action.alternate?.clone();
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),

    /*on(WaypointActions.modifyRoute, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        const dataItem = undefined; // TODO: items.findDataItemByPos(action.newPosition)
        const wp = WaypointConverter.createWaypointFromDataItem(dataItem, action.newPosition.clone());
        if (action.isNewWaypoint) {
            ArrayHelper.insertAt(newFlightroute.waypoints, action.index, wp);
        } else {
            newFlightroute.waypoints[action.index] = wp;
        }
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),*/
    // TODO: user logout => route list = []
);
