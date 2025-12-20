import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {WaypointActions} from './waypoints.actions';
import {WaypointConverter} from '../../domain/converter/waypoint-converter';
import {ISearchService} from '../../../search/domain/service/i-search.service';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {select, Store} from '@ngrx/store';
import {getFlightroute} from './flightroute.selectors';
import {FlightrouteActions} from './flightroute.actions';
import {ArrayHelper} from '../../../system/domain/service/array/array-helper';
import {PlanActions} from '../../../plan/state/ngrx/plan.actions';
import { getNotamState } from '../../../notam/state/ngrx/notam.selectors';


@Injectable()
export class WaypointEffects {
    private readonly HIT_TOLERANCE_PX = 10;

    private readonly notamState$ = this.appStore.select(getNotamState);
    private readonly flightroute$ = this.appStore.pipe(select(getFlightroute));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private searchService: ISearchService,
    ) {
    }


    insertWaypointAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.insert),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newFlightroute = flightroute.clone();
            ArrayHelper.insertAt(newFlightroute.waypoints, action.index, action.newWaypoint.clone());
            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    selectPlanTabOnFirstWaypoint$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.insert),
        withLatestFrom(this.flightroute$),
        filter(([_, flightroute]) => !flightroute?.waypoints || flightroute.waypoints.length === 0),
        map(() => PlanActions.selectPlanTab({selectedPlanTab: 'route'}))
    ));


    insertWaypointByPos$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.insertByPos),
        withLatestFrom(this.notamState$),
        switchMap(([action, notamState]) => this.searchService.searchByPosition(
            action.newPosition,
            OlGeometry.calcDegPerPixelByZoom(action.zoom) * this.HIT_TOLERANCE_PX,
            notamState.interval
        ).pipe(
            map(results => ({action: action, results: results}))
        )),
        map((actionResults) => {
            const dataItem = actionResults.results.getPointResults()[0].getDataItem();
            const wp = WaypointConverter.createWaypointFromDataItem(dataItem, actionResults.action.newPosition);
            return WaypointActions.insert({newWaypoint: wp, index: actionResults.action.index});
        })
    ));


    updateWaypointAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.update),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newFlightroute = flightroute.clone();
            const wpIndex = flightroute.getWaypointIndex(action.oldWp);
            newFlightroute.waypoints[wpIndex] = action.newWp.clone();
            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    deleteWaypointAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.delete),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newFlightroute = flightroute.clone();
            if (flightroute.isAlternateWaypoint(action.waypoint)) {
                newFlightroute.alternate = undefined;
            } else {
                const idx = flightroute.getWaypointIndex(action.waypoint);
                ArrayHelper.removeAt(newFlightroute.waypoints, idx);
            }
            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    replaceWaypointAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.replace),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newFlightroute = flightroute.clone();
            newFlightroute.waypoints[action.index] = action.newWaypoint.clone();
            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    replaceWaypointByPos$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.replaceByPos),
        withLatestFrom(this.notamState$),
        switchMap(([action, notamState]) => this.searchService.searchByPosition(
            action.newPosition,
            OlGeometry.calcDegPerPixelByZoom(action.zoom) * this.HIT_TOLERANCE_PX,
            notamState.interval
        ).pipe(
            map(results => ({action: action, results: results}))
        )),
        map((actionResults) => {
            const dataItem = actionResults.results.getPointResults()[0].getDataItem();
            const wp = WaypointConverter.createWaypointFromDataItem(dataItem, actionResults.action.newPosition);
            return WaypointActions.replace({newWaypoint: wp, index: actionResults.action.index});
        })
    ));


    reverseWaypointsAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.reverse),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newFlightroute = flightroute.clone();
            newFlightroute.waypoints.reverse();
            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    setAlternateAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.setAlternate),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newFlightroute = flightroute.clone();
            newFlightroute.alternate = action.alternate?.clone();
            return FlightrouteActions.changed({flightroute: newFlightroute});
        })
    ));


    /* on(WaypointActions.modifyRoute, (state, action) => {
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
}
