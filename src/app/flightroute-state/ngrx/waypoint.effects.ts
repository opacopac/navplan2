import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {WaypointActions} from './waypoints.actions';
import {WaypointConverter} from '../../flightroute/domain-model/converter/waypoint-converter';
import {ISearchService} from '../../search/domain-service/i-search.service';
import {OlGeometry} from '../../base-map-view/ol-model/ol-geometry';


@Injectable()
export class WaypointEffects {
    private readonly HIT_TOLERANCE_PX = 10;


    constructor(
        private actions$: Actions,
        private searchService: ISearchService
    ) {
    }


    insertWaypointByPos$ = createEffect(() => this.actions$.pipe(
        ofType(WaypointActions.insertByPos),
        switchMap(action => this.searchService.searchByPosition(
            action.newPosition,
            OlGeometry.calcDegPerPixelByZoom(action.zoom) * this.HIT_TOLERANCE_PX,
            0,
            1
        ).pipe(
            map(results => ({ action: action, results: results}))
        )),
        map((actionResults) => {
            const dataItem = actionResults.results.getPointResults()[0].getDataItem();
            const wp = WaypointConverter.createWaypointFromDataItem(dataItem, actionResults.action.newPosition);
            return WaypointActions.insert({ newWaypoint: wp, index: actionResults.action.index });
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
            map(results => ({ action: action, results: results}))
        )),
        map((actionResults) => {
            const dataItem = actionResults.results.getPointResults()[0].getDataItem();
            const wp = WaypointConverter.createWaypointFromDataItem(dataItem, actionResults.action.newPosition);
            return WaypointActions.replace({ newWaypoint: wp, index: actionResults.action.index });
        })
    ));
}
