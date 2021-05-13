import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, debounceTime, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Observable, pipe, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';
import {environment} from '../../../environments/environment';
import {DataItemType} from '../../common/model/data-item';
import {ShortAirport} from '../../airport/domain-model/short-airport';
import {FlightMapActions} from './flight-map.actions';
import {AirportService} from '../../airport/rest-service/airport.service';
import {AirspaceService} from '../../airspace/rest-service/airspace.service';
import {WebcamService} from '../../webcam/rest-service/webcam.service';
import {NotamService} from '../../notam/domain-service/notam-service';
import {MetarTafService} from '../../metar-taf/domain-service/metar-taf.service';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {of} from 'rxjs/internal/observable/of';
import {getFlightMapState} from './flight-map.selectors';
import {FlightMapState} from './flight-map-state';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {NavaidService} from '../../navaid/domain-service/navaid.service';


@Injectable()
export class FlightMapEffects {
    private readonly flightMapState$: Observable<FlightMapState> = this.appStore.select(pipe(getFlightMapState));

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


    mapMovedZoomedRotatedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(250),
        withLatestFrom(this.flightMapState$),
        tap(([action, flightMapState]) => {
            const oversizeExtent = action.extent.getOversizeExtent(environment.mapOversizeFactor);

            // airports
            if (!this.isCached(action, flightMapState.airportState)) {
                this.airportService.readAirportsByExtent(oversizeExtent, action.zoom).pipe(
                    map(airports => FlightMapActions.showAirports({
                        extent: oversizeExtent,
                        zoom: action.zoom,
                        airports: airports
                    })),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            // airport circuits
            if (!this.isCached(action, flightMapState.airportCircuitState)) {
                this.airportService.readAirportCircuitsByExtent(oversizeExtent, action.zoom).pipe(
                    map(circuits => FlightMapActions.showCircuits({
                        extent: oversizeExtent,
                        zoom: action.zoom,
                        airportCircuits: circuits
                    })),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            // reporting points/sectors
            if (!this.isCached(action, flightMapState.reportingPointSectorState)) {
                this.airportService.readReportingPointsByExtent(oversizeExtent, action.zoom).pipe(
                    map(response => FlightMapActions.showReportingPointsSectors({
                        extent: oversizeExtent,
                        zoom: action.zoom,
                        reportingPoints: response.reportingPoints,
                        reportingSectors: response.reportingSectors
                    })),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            // airspaces
            if (!this.isCached(action, flightMapState.airspaceState)) {
                this.airspaceService.readAirspacesByExtent(oversizeExtent, action.zoom).pipe(
                    map(airspaces => FlightMapActions.showAirspaces({
                        extent: oversizeExtent,
                        zoom: action.zoom,
                        airspaces: airspaces
                    })),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            // navaids
            if (!this.isCached(action, flightMapState.navaidState)) {
                this.navaidService.readNavaidsByExtent(oversizeExtent, action.zoom).pipe(
                    map(navaids => FlightMapActions.showNavaids({
                        extent: oversizeExtent,
                        zoom: action.zoom,
                        navaids: navaids
                    })),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }

            /*this.notamService.readByExtent(action.extent, action.zoom).pipe(
                map(notams => new ReadNotamSuccessAction(notams)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();*/

            /*this.metarTafService.readByExtent(action.extent, action.zoom).pipe(
                map(metarTafs => new ReadMetarTafSuccessAction(metarTafs)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();*/

            // webcams
            if (!this.isCached(action, flightMapState.webcamState)) {
                this.webcamService.readWebcamsByExtent(action.extent, action.zoom).pipe(
                    map(webcams => FlightMapActions.showWebcams({
                        extent: oversizeExtent,
                        zoom: action.zoom,
                        webcams: webcams
                    })),
                    tap(displayAction => this.appStore.dispatch(displayAction))
                ).subscribe();
            }
        })
    ), { dispatch: false });


    mapClickedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        switchMap(action => {
            switch (action.dataItem?.dataItemType) {
                case DataItemType.airport:
                    return this.airportService.readAirportById((action.dataItem as ShortAirport).id).pipe(
                        map(airport => FlightMapActions.showOverlay({
                            dataItem: airport,
                            clickPos: action.clickPos
                        }))
                    );
                case DataItemType.reportingPoint:
                case DataItemType.reportingSector:
                case DataItemType.navaid:
                    return of(FlightMapActions.showOverlay(action));
                default:
                    return of(FlightMapActions.closeAllOverlays());
            }
        })
    ));


    showAirportChartOnMap$ = createEffect(() => this.actions$.pipe(
        ofType(FlightMapActions.showAirportChart),
        switchMap(action => this.airportService.readAdChartById(action.chartId).pipe(
            map(chart => BaseMapActions.showImage({
                id: chart.id,
                imageUrl: environment.chartBaseUrl + chart.fileName,
                extent: chart.extent,
                opacity: 0.9
            })),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading airport chart by id', error);
                return throwError(error);
            })
        ))
    ));


    private isCached(action: { extent: Extent2d, zoom: number }, currentState: { extent: Extent2d, zoom: number }): boolean {
        if (currentState.extent && action.extent) {
            return (currentState.extent.containsExtent2d(action.extent) && currentState.zoom === action.zoom);
        } else {
            return false;
        }
    }
}
