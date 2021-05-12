import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {catchError, debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {
    BaseMapActionTypes,
    BaseMapClickedAction,
    BaseMapImageShowAction,
    BaseMapMovedZoomedRotatedAction
} from '../../base-map/ngrx/base-map.actions';
import {environment} from '../../../environments/environment';
import {DataItemType} from '../../common/model/data-item';
import {ShortAirport} from '../../airport/domain-model/short-airport';
import {
    CloseAllMapOverlaysAction,
    FlightMapActionTypes,
    ShowAirportChartOnMapAction,
    ShowAirportCircuitsOnMapAction,
    ShowAirportMapOverlayAction,
    ShowAirportsOnMapAction,
    ShowAirspacesOnMapAction,
    ShowNavaidsOnMapAction,
    ShowReportingPointMapOverlayAction,
    ShowReportingPointsOnMapAction,
    ShowReportingSectorMapOverlayAction,
    ShowWebcamsOnMapAction
} from './flight-map.actions';
import {ReportingPoint} from '../../airport/domain-model/reporting-point';
import {ReportingSector} from '../../airport/domain-model/reporting-sector';
import {AirportService} from '../../airport/rest-service/airport.service';
import {of} from 'rxjs/internal/observable/of';
import {AirspaceService} from '../../airspace/rest-service/airspace.service';
import {NavaidService} from '../../navaid/rest-service/navaid.service';
import {WebcamService} from '../../webcam/rest-service/webcam.service';
import {NotamService} from '../../notam/domain-service/notam-service';
import {MetarTafService} from '../../metar-taf/domain-service/metar-taf.service';
import {LoggingService} from '../../system/domain-service/logging/logging.service';


@Injectable()
export class FlightMapEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: AirportService,
        private readonly airspaceService: AirspaceService,
        private readonly navaidService: NavaidService,
        private readonly notamService: NotamService,
        private readonly metarTafService: MetarTafService,
        private readonly webcamService: WebcamService
    ) {
    }


    mapMovedZoomedRotatedAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActionTypes.BASE_MAP_MOVED_ZOOMED_ROTATED),
        map(action => action as BaseMapMovedZoomedRotatedAction),
        debounceTime(250),
        tap(action => {
            this.airportService.readAirportsByExtent(action.extent, action.zoom).pipe(
                map(airports => new ShowAirportsOnMapAction(airports)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            this.airportService.readAirportCircuitsByExtent(action.extent, action.zoom).pipe(
                map(circuits => new ShowAirportCircuitsOnMapAction(circuits)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            this.airportService.readReportingPointsByExtent(action.extent, action.zoom).pipe(
                map(response => new ShowReportingPointsOnMapAction(response.reportingPoints, response.reportingSectors)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            this.airspaceService.readAirspacesByExtent(action.extent, action.zoom).pipe(
                map(airspaces => new ShowAirspacesOnMapAction(airspaces)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            this.navaidService.readNavaidsByExtent(action.extent, action.zoom).pipe(
                map(navaids => new ShowNavaidsOnMapAction(navaids)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            /*this.notamService.readByExtent(action.extent, action.zoom).pipe(
                map(notams => new ReadNotamSuccessAction(notams)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            this.metarTafService.readByExtent(action.extent, action.zoom).pipe(
                map(metarTafs => new ReadMetarTafSuccessAction(metarTafs)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();*/
            this.webcamService.readWebcamsByExtent(action.extent, action.zoom).pipe(
                map(webcams => new ShowWebcamsOnMapAction(webcams)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
        })
    ), { dispatch: false });


    mapClickedAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActionTypes.BASE_MAP_CLICKED),
        map(action => action as BaseMapClickedAction),
        switchMap(action => {
            switch (action.dataItem?.dataItemType) {
                case DataItemType.airport:
                    return this.airportService.readAirportById((action.dataItem as ShortAirport).id).pipe(
                        map(airport => new ShowAirportMapOverlayAction(airport))
                    );
                case DataItemType.reportingPoint:
                    return of(new ShowReportingPointMapOverlayAction(action.dataItem as ReportingPoint));
                case DataItemType.reportingSector:
                    return of(new ShowReportingSectorMapOverlayAction(action.dataItem as ReportingSector));
                default:
                    return of(new CloseAllMapOverlaysAction());
            }
        })
    ));


    showAirportChartOnMap$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightMapActionTypes.SHOW_AIRPORT_CHART_ON_MAP),
        map(action => action as ShowAirportChartOnMapAction),
        switchMap(action => this.airportService.readAdChartById(action.chartId).pipe(
            map(chart => new BaseMapImageShowAction(
                chart.id,
                environment.chartBaseUrl + chart.fileName,
                chart.extent,
                0.9
            )),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading airport chart by id', error);
                return throwError(error);
            })
        ))
    ));
}
