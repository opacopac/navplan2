import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {getFlightroute} from './flightroute.selectors';
import {FlightrouteActions} from './flightroute.actions';
import {FlightrouteCalcHelper} from '../../domain/service/flightroute-calc.helper';
import {getRouteDistanceUnit} from '../../../geo-physics/state/ngrx/geo-physics.selectors';
import {initialFlightrouteState} from './flightroute.reducer';
import {AircraftListActions} from '../../../aircraft/state/ngrx/aircraft-list.actions';
import {getCurrentAircraft} from '../../../aircraft/state/ngrx/aircraft.selectors';


@Injectable()
export class FlightrouteEffects {
    private flightroute$ = this.appStore.pipe(select(getFlightroute));
    private aircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    private routeDistanceUnit$ = this.appStore.pipe(select(getRouteDistanceUnit));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
    ) {
    }


    // flightroute actions

    updateExtraTimeAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.updateExtraTime),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newFlightroute = flightroute.clone();
            newFlightroute.extraTime = action.extraTime;
            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    updateCruiseSpeedAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.updateCruiseSpeed),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newAircraftParams = flightroute.aircraftParams.clone();
            newAircraftParams.speed = action.cruiseSpeed;
            const newFlightroute = flightroute.clone();
            newFlightroute.aircraftParams = newAircraftParams;
            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    updateCruiseConsumptionAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.updateCruiseConsumption),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newAircraftParams = flightroute.aircraftParams.clone();
            newAircraftParams.consumption = action.cruiseConsumption;
            const newFlightroute = flightroute.clone();
            newFlightroute.aircraftParams = newAircraftParams;
            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    clearFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.clear),
        map(() => FlightrouteActions.changed({flightroute: initialFlightrouteState.flightroute.clone()}))
    ));


    recalculateFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.changed),
        withLatestFrom(this.routeDistanceUnit$),
        map(([action, routeDistanceUnit]) => {
            const newFlightRoute = action.flightroute?.clone();
            FlightrouteCalcHelper.calcFlightRoute(newFlightRoute, routeDistanceUnit);
            return FlightrouteActions.update({flightroute: newFlightRoute});
        })
    ));


    // aircraft actions

    selectAircraftSuccessAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftListActions.selectAircraftSuccess),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newAircraftParams = flightroute.aircraftParams.clone();
            newAircraftParams.speed = action.aircraft.cruiseSpeed;
            newAircraftParams.consumption = action.aircraft.cruiseFuel;
            const newFlightroute = flightroute.clone();
            newFlightroute.aircraftParams = newAircraftParams;

            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    updateUseAircraftSpeedValueAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.updateUseAircraftSpeedValue),
        withLatestFrom(this.flightroute$, this.aircraft$),
        map(([action, flightroute, selectedAircraft]) => {
            const newAircraftParams = flightroute.aircraftParams.clone();
            newAircraftParams.speed = action.useAircraftSpeed
                ? selectedAircraft?.cruiseSpeed
                : newAircraftParams.speed;
            const newFlightroute = flightroute.clone();
            newFlightroute.aircraftParams = newAircraftParams;

            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    updateUseAircraftConsumptionValueAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.updateUseAircraftConsumptionValue),
        withLatestFrom(this.flightroute$, this.aircraft$),
        map(([action, flightroute, selectedAircraft]) => {
            const newAircraftParams = flightroute.aircraftParams.clone();
            newAircraftParams.consumption = action.useAircraftConsumption
                ? selectedAircraft?.cruiseFuel
                : newAircraftParams.consumption;
            const newFlightroute = flightroute.clone();
            newFlightroute.aircraftParams = newAircraftParams;

            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));
}
