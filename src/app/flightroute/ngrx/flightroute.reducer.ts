import {FlightrouteState} from '../domain-model/flightroute-state';
import {Aircraft} from '../domain-model/aircraft';
import {Flightroute} from '../domain-model/flightroute';
import {Speed} from '../../common/geo-math/domain-model/quantities/speed';
import {
    ConsumptionUnit,
    LengthUnit,
    SpeedUnit,
    TimeUnit,
    VolumeUnit
} from '../../common/geo-math/domain-model/quantities/units';
import {Consumption} from '../../common/geo-math/domain-model/quantities/consumption';
import {Time} from '../../common/geo-math/domain-model/quantities/time';
import {FlightrouteCalcHelper} from '../domain-service/flightroute-calc.helper';
import {createReducer, on} from '@ngrx/store';
import {FlightRouteListActions} from './flight-route-list.actions';
import {FlightRouteActions} from './flight-route.actions';
import {SharedFlightRouteActions} from './shared-flight-route.actions';
import {FlightRouteParameterActions} from './flight-route-parameter.actions';
import {WaypointActions} from './waypoints.actions';
import {ArrayHelper} from '../../system/domain-service/array/array-helper';


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
    showShareId: undefined,
    distanceUnit: LengthUnit.NM,
    speedUnit: SpeedUnit.KT,
    altitudeUnit: LengthUnit.FT,
    fuelUnit: VolumeUnit.L,
    consumptionUnit: ConsumptionUnit.L_PER_H
};


export const flightRouteReducer = createReducer(
    initialState,

    // FlightRouteListActions
    on(FlightRouteListActions.showList, (state, action) => ({
        ...state,
        flightrouteList: action.flightrouteList
    })),
    on(FlightRouteActions.show, (state, action) => {
        const newFlightroute = action.flightroute.clone();
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
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
    on(FlightRouteParameterActions.updateComments, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        newFlightroute.comments = action.comments;
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),
    on(FlightRouteParameterActions.updateExtraTime, (state, action) => {
        const newFlightroute = state.flightroute.clone();
        newFlightroute.extraTime = new Time(action.extraTimeMinutesValue, TimeUnit.M);
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),
    on(FlightRouteParameterActions.updateAircraftSpeed, (state, action) => {
        const newAircraft = state.flightroute.aircraft.clone();
        newAircraft.speed = new Speed(action.aircraftSpeedValue, state.speedUnit);
        const newFlightroute = state.flightroute.clone();
        newFlightroute.aircraft = newAircraft;
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),
    on(FlightRouteParameterActions.updateAircraftConsumption, (state, action) => {
        const newAircraft = state.flightroute.aircraft.clone();
        newAircraft.consumption = new Consumption(action.aircraftConsumptionValue, state.consumptionUnit);
        const newFlightroute = state.flightroute.clone();
        newFlightroute.aircraft = newAircraft;
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
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
        const wpIndex = newFlightroute.waypoints.indexOf(action.oldWp);
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
        const idx = newFlightroute.getWaypointIndex(action.waypoint);
        ArrayHelper.removeAt(newFlightroute.waypoints, idx);
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
