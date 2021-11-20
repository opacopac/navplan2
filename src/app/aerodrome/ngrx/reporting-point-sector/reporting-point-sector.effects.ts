import {Actions, createEffect, ofType} from '@ngrx/effects';
import {debounceTime, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ReportingPointSectorActions} from './reporting-point-sector.actions';
import {Observable, of, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getReportingPointSectorState} from './reporting-point-sector.selectors';
import {ReportingPointSectorState} from '../../domain-model/reporting-point-sector-state';
import {environment} from '../../../../environments/environment';
import {BaseMapActions} from '../../../base-map/ngrx/base-map.actions';
import {IReportingPointRepo} from '../../domain-service/i-reporting-point-repo';


@Injectable()
export class ReportingPointSectorEffects {
    private readonly REPORTING_POINT_MIN_ZOOM = 11;
    private readonly reportingPointSectorState$: Observable<ReportingPointSectorState>
        = this.appStore.select(pipe(getReportingPointSectorState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly reportingPointRepo: IReportingPointRepo,
    ) {
    }


    showReportingPointsSectorsAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(250),
        withLatestFrom(this.reportingPointSectorState$),
        filter(([action, currentState]) => !currentState.extent
            || !action.extent
            || !currentState.extent.containsExtent2d(action.extent)
            || (currentState.zoom < this.REPORTING_POINT_MIN_ZOOM && action.zoom >= this.REPORTING_POINT_MIN_ZOOM)),
        switchMap(([action, currentState]) => {
            if (action.zoom < this.REPORTING_POINT_MIN_ZOOM) {
                return of({ extent: action.extent, zoom: action.zoom, reportingPoints: [], reportingSectors: [] });
            } else {
                return this.reportingPointRepo.readReportingPointsByExtent(action.extent).pipe(
                    map(repPointsSectors => ({
                        extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                        zoom: action.zoom,
                        reportingPoints: repPointsSectors.reportingPoints,
                        reportingSectors: repPointsSectors.reportingSectors
                    }))
                );
            }
        }),
        map(newState => ReportingPointSectorActions.showReportingPointsSectors(newState))
    ));
}
