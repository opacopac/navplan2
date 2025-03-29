import {FlightrouteState} from '../state-model/flightroute-state';
import {AircraftParams} from '../../domain/model/aircraftParams';
import {Flightroute} from '../../domain/model/flightroute';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {TimeUnit} from '../../../geo-physics/domain/model/quantities/time-unit';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {createReducer, on} from '@ngrx/store';
import {SharedFlightRouteActions} from './shared-flight-route.actions';
import {SpeedUnit} from '../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../geo-physics/domain/model/quantities/consumption-unit';
import {FlightrouteActions} from './flightroute.actions';
import {FlightrouteListActions} from './flightroute-list.actions';
import {AircraftListActions} from '../../../aircraft/state/ngrx/aircraft-list.actions';
import {initialTableState} from '../../../common/state/model/table-state';


export const initialFlightrouteState: FlightrouteState = {
    flightrouteList: [],
    flightroute: new Flightroute(
        -1,
        '',
        '',
        new AircraftParams(
            new Speed(100, SpeedUnit.KT), // TODO: initial values from default aircraft
            new Consumption(25, ConsumptionUnit.L_PER_H)
        ),
        [],
        undefined,
        new Time(0, TimeUnit.M)
    ),
    useAircraftSpeedValue: false,
    useAircraftConsumptionValue: false,
    flightrouteTableState: initialTableState
};


export const flightRouteReducer = createReducer(
    initialFlightrouteState,

    // FlightrouteListActions

    on(FlightrouteListActions.readListSuccess, (state, action) => ({
        ...state,
        flightrouteList: action.flightrouteList
    })),

    on(FlightrouteListActions.updateTableState, (state, action) => ({
        ...state,
        flightrouteTableState: action.tableState
    })),

    // TODO: user logout => route list = []


    // FlightrouteActions

    on(FlightrouteActions.update, (state, action) => {
        return {
            ...state,
            flightroute: action.flightroute,
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


    // AircraftActions

    on(AircraftListActions.selectAircraftSuccess, (state, action) => {
        return {
            ...state,
            useAircraftSpeedValue: true,
            useAircraftConsumptionValue: true,
            selectedAircraft: action.aircraft,
        };
    }),

    on(FlightrouteActions.updateUseAircraftSpeedValue, (state, action) => {
        return {
            ...state,
            useAircraftSpeedValue: action.useAircraftSpeed
        };
    }),

    on(FlightrouteActions.updateUseAircraftConsumptionValue, (state, action) => {
        return {
            ...state,
            useAircraftConsumptionValue: action.useAircraftConsumption
        };
    }),
);
