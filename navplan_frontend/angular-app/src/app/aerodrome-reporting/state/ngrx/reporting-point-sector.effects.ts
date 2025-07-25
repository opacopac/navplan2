import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ReportingPointSectorActions} from './reporting-point-sector.actions';
import {Observable, of, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getReportingPointSectorState} from './reporting-point-sector.selectors';
import {ReportingPointSectorState} from '../state-model/reporting-point-sector-state';
import {environment} from '../../../../environments/environment';
import {IReportingPointService} from '../../domain/service/i-reporting-point.service';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';
import {FlightMapActions} from '../../../flight-map/state/ngrx/flight-map.actions';
import {Airport} from '../../../aerodrome/domain/model/airport';


@Injectable()
export class ReportingPointSectorEffects {
    private readonly REPORTING_POINT_MIN_ZOOM = 11;
    private readonly reportingPointSectorState$: Observable<ReportingPointSectorState>
        = this.appStore.select(pipe(getReportingPointSectorState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly reportingPointService: IReportingPointService,
    ) {
    }


    updateReportingPointsSectorsAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMovedDebounced),
        withLatestFrom(this.reportingPointSectorState$),
        filter(([action, currentState]) => !currentState.extent
            || !action.extent
            || !currentState.extent.containsExtent2d(action.extent)
            || (currentState.zoom < this.REPORTING_POINT_MIN_ZOOM && action.zoom >= this.REPORTING_POINT_MIN_ZOOM)),
        switchMap(([action, currentState]) => {
            if (action.zoom < this.REPORTING_POINT_MIN_ZOOM) {
                return of({extent: action.extent, zoom: action.zoom, reportingPoints: [], reportingSectors: []});
            } else {
                return this.reportingPointService.readReportingPointsByExtent(action.extent).pipe(
                    map(repPointsSectors => ({
                        extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                        zoom: action.zoom,
                        reportingPoints: repPointsSectors.reportingPoints,
                        reportingSectors: repPointsSectors.reportingSectors
                    }))
                );
            }
        }),
        map(newState => ReportingPointSectorActions.readSuccess(newState))
    ));


    readAirportReportingPointsAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightMapActions.showOverlaySuccess),
        filter(action => action.dataItem instanceof Airport),
        map(action => action.dataItem as Airport),
        filter(airport => airport && airport.icao && airport.icao.length > 0),
        switchMap(airport => this.reportingPointService.readReportingPointsByAirportIcao(airport.icao)),
        map(repPointsSectors => ReportingPointSectorActions.readByAirportIcaoSuccess({
            reportingPointsAndSectors: repPointsSectors
        }))
    ));
}
