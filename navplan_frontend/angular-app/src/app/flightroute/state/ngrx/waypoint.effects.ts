import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {WaypointActions} from './waypoints.actions';
import {WaypointConverter} from '../../domain/model/converter/waypoint-converter';
import {ISearchService} from '../../../search/domain/service/i-search.service';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {Observable} from 'rxjs';
import {Flightroute} from '../../domain/model/flightroute';
import {select, Store} from '@ngrx/store';
import {getFlightroute} from './flightroute.selectors';
import {FlightrouteActions} from './flightroute.actions';
import {ArrayHelper} from '../../../system/domain/service/array/array-helper';


@Injectable()
export class WaypointEffects {
    private readonly HIT_TOLERANCE_PX = 10;

    private flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private searchService: ISearchService
    ) {
    }


    insertWaypointAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.insert),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newFlightroute = flightroute.clone();
            ArrayHelper.insertAt(newFlightroute.waypoints, action.index, action.newWaypoint.clone());
            return FlightrouteActions.recalculate({flightroute: newFlightroute});
        })
    ));


    insertWaypointByPos$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.insertByPos),
        switchMap(action => this.searchService.searchByPosition(
            action.newPosition,
            OlGeometry.calcDegPerPixelByZoom(action.zoom) * this.HIT_TOLERANCE_PX,
            0,
            1
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
            return FlightrouteActions.recalculate({flightroute: newFlightroute});
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
            return FlightrouteActions.recalculate({flightroute: newFlightroute});
        })
    ));


    replaceWaypointAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.replace),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newFlightroute = flightroute.clone();
            newFlightroute.waypoints[action.index] = action.newWaypoint.clone();
            return FlightrouteActions.recalculate({flightroute: newFlightroute});
        })
    ));


    replaceWaypointByPos$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.replaceByPos),
        switchMap(action => this.searchService.searchByPosition(
            action.newPosition,
            OlGeometry.calcDegPerPixelByZoom(action.zoom) * this.HIT_TOLERANCE_PX,
            0,
            1
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
            return FlightrouteActions.recalculate({flightroute: newFlightroute});
        })
    ));


    setAlternateAction$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.setAlternate),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => {
            const newFlightroute = flightroute.clone();
            newFlightroute.alternate = action.alternate?.clone();
            return FlightrouteActions.recalculate({flightroute: newFlightroute});
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
