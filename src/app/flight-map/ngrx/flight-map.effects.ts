import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, debounceTime, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Observable, pipe, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';
import {environment} from '../../../environments/environment';
import {DataItemType} from '../../common/model/data-item';
import {ShortAirport} from '../../aerodrome/domain-model/short-airport';
import {FlightMapActions} from './flight-map.actions';
import {NotamService} from '../../notam/domain-service/notam-service';
import {MetarTafService} from '../../metar-taf/domain-service/metar-taf.service';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {of} from 'rxjs/internal/observable/of';
import {getFlightMapState} from './flight-map.selectors';
import {FlightMapState} from './flight-map-state';
import {NavaidService} from '../../enroute/domain-service/navaid.service';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {AirportService} from '../../aerodrome/domain-service/airport.service';
import {AirportChart} from '../../aerodrome/domain-model/airport-chart';
import {SearchService} from '../../search/rest-service/search.service';
import {OlHelper} from '../../base-map/ol-service/ol-helper';
import {AirspaceService} from '../../enroute/domain-service/airspace.service';
import {WebcamService} from '../../webcam/domain-service/webcam.service';
import {AirportCircuitService} from '../../aerodrome/domain-service/airport-circuit.service';
import {AirportChartService} from '../../aerodrome/domain-service/airport-chart.service';
import {ReportingPointService} from '../../aerodrome/domain-service/reporting-point.service';


@Injectable()
export class FlightMapEffects {
    private readonly flightMapState$: Observable<FlightMapState> = this.appStore.select(pipe(getFlightMapState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: AirportService,
        private readonly airportCircuitService: AirportCircuitService,
        private readonly airportChartService: AirportChartService,
        private readonly reportingPointService: ReportingPointService,
        private readonly airspaceService: AirspaceService,
        private readonly metarTafService: MetarTafService,
        private readonly navaidService: NavaidService,
        private readonly notamService: NotamService,
        private readonly webcamService: WebcamService,
        private readonly searchService: SearchService
    ) {
    }


    mapMovedZoomedRotatedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(250),
        withLatestFrom(this.flightMapState$),
        tap(([action, flightMapState]) => {
            const oversizeExtent = action.extent.getOversizeExtent(environment.mapOversizeFactor);

            // airports
            if (this.airportService.isAirportReloadRequired(action, flightMapState.airportState)) {
                this.airportService.readAirportsByExtent(oversizeExtent, action.zoom).pipe(
                    map(newAirportState => FlightMapActions.showAirports(newAirportState)),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            // airport circuits
            if (this.airportCircuitService.isAirportCircuitReloadRequired(action, flightMapState.airportCircuitState)) {
                this.airportCircuitService.readAirportCircuitsByExtent(oversizeExtent, action.zoom).pipe(
                    map(newCircuitState => FlightMapActions.showCircuits(newCircuitState)),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            // reporting points/sectors
            if (this.reportingPointService.isReportingPointReloadRequired(action, flightMapState.reportingPointSectorState)) {
                this.reportingPointService.readReportingPointsByExtent(oversizeExtent, action.zoom).pipe(
                    map(newRepPointSectorState => FlightMapActions.showReportingPointsSectors(newRepPointSectorState)),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            // airspaces
            if (this.airspaceService.isAirspaceReloadRequired(action, flightMapState.airspaceState)) {
                this.airspaceService.readAirspacesByExtent(oversizeExtent, action.zoom).pipe(
                    map(newAirspaceState => FlightMapActions.showAirspaces(newAirspaceState)),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            // navaids
            if (this.navaidService.isNavaidReloadRequired(action, flightMapState.navaidState)) {
                this.navaidService.readNavaidsByExtent(oversizeExtent, action.zoom).pipe(
                    map(newNavaidState => FlightMapActions.showNavaids(newNavaidState)),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            /*this.notamService.readByExtent(action.extent, action.zoom).pipe(
                map(notams => new ReadNotamSuccessAction(notams)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();*/

            // metar / taf
            if (this.metarTafService.isMetarTafReloadRequired(action, flightMapState.metarTafState)) {
                this.metarTafService.readByExtent(oversizeExtent, action.zoom).pipe(
                    map(newMetarTafState => FlightMapActions.showMetarTafs(newMetarTafState)),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            // webcams
            if (this.webcamService.isWebcamReloadRequired(action, flightMapState.webcamState)) {
                this.webcamService.readWebcamsByExtent(oversizeExtent, action.zoom).pipe(
                    map(newWebcamState => FlightMapActions.showWebcams(newWebcamState)),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }
        })
    ), { dispatch: false });


    mapClickedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.flightMapState$),
        switchMap(([action, flightMapState]) => {
            switch (action.dataItem?.dataItemType) {
                case DataItemType.airport:
                    return this.airportService.readAirportById((action.dataItem as ShortAirport).id).pipe(
                        map(airport => FlightMapActions.showAirportOverlay({
                            airport: airport,
                            metarTaf: this.metarTafService.findMetarTafInState(airport.icao, flightMapState.metarTafState),
                            notams: [], // TODO
                            tabIndex: 0
                        }))
                    );
                case DataItemType.metarTaf:
                    const metarTaf = action.dataItem as MetarTaf;
                    const shortAirport = this.airportService.findAirportInState(metarTaf.ad_icao, flightMapState.airportState);
                    return this.airportService.readAirportById(shortAirport.id).pipe(
                        map(airport => FlightMapActions.showAirportOverlay({
                            airport: airport,
                            metarTaf: metarTaf,
                            notams: [], // TODO
                            tabIndex: 3
                        }))
                    );
                case DataItemType.reportingPoint:
                case DataItemType.reportingSector:
                case DataItemType.navaid:
                    return of(FlightMapActions.showOverlay(action));
                case DataItemType.airportChart:
                    const chart = action.dataItem as AirportChart;
                    this.appStore.dispatch(BaseMapActions.closeImage({ id: chart.id }));
                    return of(FlightMapActions.closeAirportChart({ chartId: chart.id }));
                default:
                    if (!flightMapState.showPositionSearchResults.clickPos) {
                        const maxRadiusDeg = OlHelper.calcDegPerPixelByZoom(action.zoom) * 50;
                        return this.searchService.searchByPosition(action.clickPos, maxRadiusDeg, 0, 999).pipe(
                            map(result => FlightMapActions.showPositionSearchResults({
                                searchResults: result,
                                clickPos: action.clickPos
                            })),
                            catchError(error => {
                                LoggingService.logResponseError('ERROR search by position', error);
                                return throwError(error);
                            })
                        );
                    } else {
                        return of(FlightMapActions.closePositionSearchResults());
                    }
            }
        })
    ));


    showAirportChartOnMap$ = createEffect(() => this.actions$.pipe(
        ofType(FlightMapActions.openAirportChart),
        switchMap(action => this.airportChartService.readAdChartById(action.chartId).pipe(
            tap(chart => this.appStore.dispatch(BaseMapActions.showImage({
                id: chart.id,
                imageUrl: environment.chartBaseUrl + chart.fileName,
                extent: chart.extent,
                opacity: 0.9
            }))),
            map(chart => FlightMapActions.showAirportChart({ chart: chart })),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading airport chart by id', error);
                return throwError(error);
            })
        ))
    ));
}
