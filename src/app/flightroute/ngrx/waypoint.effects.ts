import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {
    DeleteWaypointAction,
    FlightrouteActionTypes,
    FlightrouteRecalcSuccessAction,
    InsertWaypointAction,
    ReplaceWaypointAction,
    ReverseWaypointsAction,
    RouteLineModifiedAction,
    SetAlternateAction,
    UpdateWaypointAction,
} from './flightroute.actions';
import {getFlightroute} from './flightroute.selectors';
import {Flightroute} from '../domain-model/flightroute';
import {FlightrouteCalcHelper} from '../domain-service/flightroute-calc.helper';
import {ArrayHelper} from '../../system/domain-service/array/array-helper';
import {WaypointFactory} from '../domain-model/waypoint-mapper/waypoint-factory';
import {OpenAipItems} from '../../open-aip/domain-model/open-aip-items';
import {getOpenAipItems} from '../../open-aip/ngrx/open-aip.selectors';


@Injectable()
export class WaypointEffects {
    private readonly flightroute$: Observable<Flightroute> = this.appStore.select(getFlightroute);
    private readonly openAipItems$: Observable<OpenAipItems> = this.appStore.select(getOpenAipItems);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>
    ) {
    }



    updateWaypointAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.WAYPOINT_UPDATE),
        map(action => action as UpdateWaypointAction),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const wpIndex = route.waypoints.indexOf(action.oldWp);
            const newFlightroute = route.clone();
            newFlightroute.waypoints[wpIndex] = action.newWp;

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => new FlightrouteRecalcSuccessAction(route)),
    ));



    insertWaypointAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.WAYPOINT_INSERT),
        map(action => action as InsertWaypointAction),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const newFlightroute = route.clone();
            ArrayHelper.insertAt(newFlightroute.waypoints, action.index, action.newWaypoint);

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => new FlightrouteRecalcSuccessAction(route))
    ));



    replaceWaypointAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.WAYPOINT_REPLACE),
        map(action => action as ReplaceWaypointAction),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const newFlightroute = route.clone();
            newFlightroute.waypoints[action.index] = action.newWaypoint;

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => new FlightrouteRecalcSuccessAction(route))
    ));



    deleteWaypointAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.WAYPOINT_DELETE),
        map(action => action as DeleteWaypointAction),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const idx = route.getWaypointIndex(action.waypoint);
            const newFlightroute = route.clone();
            ArrayHelper.removeAt(newFlightroute.waypoints, idx);

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => new FlightrouteRecalcSuccessAction(route))
    ));



    reverseWaypointsAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.WAYPOINT_REVERSE),
        map(action => action as ReverseWaypointsAction),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const newFlightroute = route.clone();
            newFlightroute.waypoints.reverse();

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => new FlightrouteRecalcSuccessAction(route)),
    ));



    setAlternateAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.WAYPOINT_SET_ALTERNATE),
        map(action => action as SetAlternateAction),
        withLatestFrom(this.flightroute$),
        map(([action, route]) => {
            const newFlightroute = route.clone();
            newFlightroute.alternate = action.alternate;

            return FlightrouteCalcHelper.calcFlightRoute(newFlightroute);
        }),
        map(route => new FlightrouteRecalcSuccessAction(route)),
    ));



    modifyRouteLineAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActionTypes.WAYPOINT_ROUTELINE_MODIFIED),
        map(action => action as RouteLineModifiedAction),
        withLatestFrom(this.openAipItems$),
        map(([action, items]) => ({
            action: action,
            dataItem: items.findDataItemByPos(action.newPosition)
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
        map(route => new FlightrouteRecalcSuccessAction(route)),
    ));
}
