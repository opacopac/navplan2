import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {getFlightroute} from './flightroute.selectors';
import {Flightroute} from '../domain-model/flightroute';
import {FlightrouteCalcHelper} from '../domain-service/flightroute-calc.helper';
import {ArrayHelper} from '../../system/domain-service/array/array-helper';
import {WaypointFactory} from '../domain-model/waypoint-mapper/waypoint-factory';
import {getFlightMapState} from '../../flight-map/ngrx/flight-map.selectors';
import {FlightMapState} from '../../flight-map/domain-model/flight-map-state';
import {WaypointActions} from './waypoints.actions';
import {FlightRouteActions} from './flight-route.actions';


@Injectable()
export class WaypointEffects {
    private readonly flightroute$: Observable<Flightroute> = this.appStore.select(getFlightroute);
    private readonly flightMapState$: Observable<FlightMapState> = this.appStore.select(getFlightMapState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>
    ) {
    }



    updateWaypointAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.update),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const wpIndex = route.waypoints.indexOf(action.oldWp);
            const newFlightroute = route.clone();
            newFlightroute.waypoints[wpIndex] = action.newWp;

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => FlightRouteActions.recalculated({ newFlightroute: route })),
    ));



    insertWaypointAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.insert),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const newFlightroute = route.clone();
            ArrayHelper.insertAt(newFlightroute.waypoints, action.index, action.newWaypoint);

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => FlightRouteActions.recalculated({ newFlightroute: route })),
    ));



    replaceWaypointAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.replace),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const newFlightroute = route.clone();
            newFlightroute.waypoints[action.index] = action.newWaypoint;

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => FlightRouteActions.recalculated({ newFlightroute: route })),
    ));



    deleteWaypointAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.delete),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const idx = route.getWaypointIndex(action.waypoint);
            const newFlightroute = route.clone();
            ArrayHelper.removeAt(newFlightroute.waypoints, idx);

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => FlightRouteActions.recalculated({ newFlightroute: route })),
    ));



    reverseWaypointsAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.reverse),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const newFlightroute = route.clone();
            newFlightroute.waypoints.reverse();

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => FlightRouteActions.recalculated({ newFlightroute: route })),
    ));



    setAlternateAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.setAlternate),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const newFlightroute = route.clone();
            newFlightroute.alternate = action.alternate;

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => FlightRouteActions.recalculated({ newFlightroute: route })),
    ));



    modifyRouteLineAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.modifyRoute),
        withLatestFrom(this.flightMapState$),
        map(([action, items]) => ({
            action: action,
            dataItem: undefined // items.findDataItemByPos(action.newPosition)
        })),
        withLatestFrom(this.flightroute$),
        map(([acDa, route]) => {
            const newFlightroute = route.clone();
            const wp = WaypointFactory.createNewWaypointFromDataItem(acDa.dataItem, acDa.action.newPosition);
            if (acDa.action.isNewWaypoint) {
                ArrayHelper.insertAt(newFlightroute.waypoints, acDa.action.index, wp);
            } else {
                newFlightroute.waypoints[acDa.action.index] = wp;
            }

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => FlightRouteActions.recalculated({ newFlightroute: route })),
    ));
}
