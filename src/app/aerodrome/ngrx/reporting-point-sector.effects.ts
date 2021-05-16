import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ReportingPointSectorActions} from './reporting-point-sector.actions';
import {Observable, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getReportingPointSectorState} from './reporting-point-sector.selectors';
import {ReportingPointService} from '../domain-service/reporting-point.service';
import {ReportingPointSectorState} from '../domain-model/reporting-point-sector-state';


@Injectable()
export class ReportingPointSectorEffects {
    private readonly reportingPointSectorState$: Observable<ReportingPointSectorState>
        = this.appStore.select(pipe(getReportingPointSectorState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly reportingPointService: ReportingPointService,
    ) {
    }


    readReportingPointsSectors$ = createEffect(() => this.actions$.pipe(
        ofType(ReportingPointSectorActions.readReportingPointsSectors),
        withLatestFrom(this.reportingPointSectorState$),
        filter(([action, currentState]) => this.reportingPointService.isReloadRequired(action, currentState)),
        switchMap(([action, currentState]) => {
            return this.reportingPointService.readByExtent(action.extent, action.zoom).pipe(
                map(newState => ReportingPointSectorActions.showReportingPointsSectors(newState))
            );
        })
    ));
}
