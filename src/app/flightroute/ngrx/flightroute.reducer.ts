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
    on(FlightRouteListActions.readListSuccess, (state, action) => ({
        ...state,
        flightrouteList: action.flightrouteList
    })),
    on(FlightRouteActions.readSuccess, (state, action) => {
        const newFlightroute = action.flightroute.clone();
        FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        return {
            ...state,
            flightroute: newFlightroute
        };
    }),
    on(FlightRouteActions.saveSuccess, (state, action) => ({
        ...state,
        flightroute: action.flightroute
    })),
    on(SharedFlightRouteActions.readSuccess, (state, action) => ({
        ...state,
        flightroute: action.flightroute
    })),
    on(SharedFlightRouteActions.saveSuccess, (state, action) => ({
        ...state,
        showShareId: action.shareId
    })),
    on(SharedFlightRouteActions.hideUrl, (state) => ({
        ...state,
        showShareId: undefined
    })),
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
    on(FlightRouteActions.recalculated, (state, action) => ({
        ...state,
        flightroute: action.newFlightroute
    })),
    // TODO: user logout => route list = []
);
