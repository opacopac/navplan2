import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {combineLatest, Observable, of, pipe} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';
import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {FlightMapActions} from './flight-map.actions';
import {getFlightMapState} from './flight-map.selectors';
import {SearchActions} from '../../../search/state/ngrx/search.actions';
import {getSearchState} from '../../../search/state/ngrx/search.selectors';
import {MetarTaf} from '../../../metar-taf/domain/model/metar-taf';
import {WebcamActions} from '../../../webcam/state/ngrx/webcam.actions';
import {Notam} from '../../../notam/domain/model/notam';
import {ShortAirport} from '../../../aerodrome/domain/model/short-airport';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Webcam} from '../../../webcam/domain/model/webcam';
import {AirportChartActions} from '../../../aerodrome-charts/state/ngrx/airport-chart.actions';
import {AirportChart} from '../../../aerodrome-charts/domain/model/airport-chart';
import {FlightMapStateService} from './flight-map-state.service';
import {WaypointActions} from '../../../flightroute/state/ngrx/waypoints.actions';
import {IAirportService} from '../../../aerodrome/domain/service/i-airport.service';
import {INotamService} from '../../../notam/domain/service/i-notam.service';
import {MeteoSmaActions} from '../../../meteo-sma/state/ngrx/meteo-sma.actions';
import {MeteoLayer} from '../../domain/model/meteo-layer';
import {MeteoForecastActions} from '../../../meteo-forecast/state/ngrx/meteo-forecast.actions';
import {SidebarMode} from './sidebar-mode';
import {Traffic} from '../../../traffic/domain/model/traffic';
import {NotamState} from '../../../notam/state/state-model/notam-state';
import {getNotamState} from '../../../notam/state/ngrx/notam.selectors';


@Injectable()
export class FlightMapEffects {
    private readonly flightMapState$ = this.appStore.select(pipe(getFlightMapState));
    private readonly searchState$ = this.appStore.select(pipe(getSearchState));
    private readonly notamState$ = this.appStore.select(getNotamState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: IAirportService,
        private readonly notamService: INotamService,
        private readonly flightMapStateService: FlightMapStateService,
    ) {
    }


    toggleFullScreenAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightMapActions.toggleFullScreen),
        withLatestFrom(this.flightMapState$),
        tap(([action, flightMapState]) => {
            if (flightMapState.showFullScreen) {
                const elem = document.getElementById('app-content-container'); // TODO
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }),
        switchMap(() => [])
    ));


    toggleMeteoAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightMapActions.toggleMeteoLayer),
        withLatestFrom(this.flightMapState$),
        switchMap(([action, flightMapState]) => {
            const returnActions = [];

            if (flightMapState.showMeteoLayer) {
                switch (flightMapState.meteoLayer) {
                    case MeteoLayer.SmaStationsLayer:
                        returnActions.push(FlightMapActions.selectMeteoLayer({meteoLayer: MeteoLayer.SmaStationsLayer}));
                        break;
                    case MeteoLayer.ForecastWeatherLayer:
                        returnActions.push(FlightMapActions.selectMeteoLayer({meteoLayer: MeteoLayer.ForecastWeatherLayer}));
                        break;
                    case MeteoLayer.ForecastWindLayer:
                        returnActions.push(FlightMapActions.selectMeteoLayer({meteoLayer: MeteoLayer.ForecastWindLayer}));
                        break;
                }
            } else {
                returnActions.push(MeteoSmaActions.close());
                returnActions.push(MeteoForecastActions.close());
            }

            return returnActions;
        })
    ));


    selectMeteoLayerAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightMapActions.selectMeteoLayer),
        withLatestFrom(this.flightMapState$),
        switchMap(([action, flightMapState]) => {
            const returnActions = [];

            switch (action.meteoLayer) {
                case MeteoLayer.SmaStationsLayer:
                    returnActions.push(MeteoForecastActions.close());
                    returnActions.push(MeteoSmaActions.open());
                    break;
                case MeteoLayer.ForecastWeatherLayer:
                    returnActions.push(MeteoSmaActions.close());
                    returnActions.push(MeteoForecastActions.open());
                    returnActions.push(MeteoForecastActions.selectWeatherForecast());
                    break;
                case MeteoLayer.ForecastWindLayer:
                    returnActions.push(MeteoSmaActions.close());
                    returnActions.push(MeteoForecastActions.open());
                    returnActions.push(MeteoForecastActions.selectWindForecast());
                    break;
            }

            return returnActions;
        })
    ));


    // region map moved/clicked

    mapClickedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.flightMapState$, this.searchState$),
        filter(([action, flightMapState, searchState]) =>
            flightMapState.sidebarMode === SidebarMode.OFF),
        switchMap(([action, flightMapState, searchState]) => {
            const returnActions = [];
            console.log(action.dataItem);

            // show map item overlay, if map item clicked
            if (action.dataItem) {
                switch (action.dataItem.dataItemType) {
                    case DataItemType.airport:
                    case DataItemType.reportingPoint:
                    case DataItemType.reportingSector:
                    case DataItemType.navaid:
                    case DataItemType.geoname:
                    case DataItemType.metarTaf:
                    case DataItemType.userPoint:
                    case DataItemType.waypoint:
                        returnActions.push(FlightMapActions.showOverlay({
                            dataItem: action.dataItem,
                            clickPos: action.clickPos,
                        }));
                        break;
                    case DataItemType.notam:
                        returnActions.push(FlightMapActions.showNotamPopup({
                            notam: action.dataItem as Notam,
                            clickPos: action.clickPos,
                        }));
                        break;
                    case DataItemType.traffic:
                        returnActions.push(FlightMapActions.showTrafficPopup({
                            traffic: action.dataItem as Traffic,
                            clickPos: action.clickPos,
                        }));
                        break;
                    case DataItemType.webcam:
                        returnActions.push(WebcamActions.show({
                            webcam: action.dataItem as Webcam
                        }));
                        break;
                    case DataItemType.airportChart:
                        returnActions.push(AirportChartActions.closeAirportChart({
                            chartId: (action.dataItem as AirportChart).id
                        }));
                }
            }

            // close map item overlay, if previously open and no map item clicked
            if (flightMapState.showMapOverlay.dataItem && !action.dataItem) {
                returnActions.push(FlightMapActions.hideOverlay());
            }

            // close NOTAM popup, if no map item clicked
            if (!action.dataItem) {
                returnActions.push(FlightMapActions.hideNotamPopup());
            }

            // close traffic popup, if no map item clicked
            if (!action.dataItem) {
                returnActions.push(FlightMapActions.hideTrafficPopup());
            }

            // close position search results, if previously open
            if (searchState.positionSearchState.clickPos) {
                returnActions.push(SearchActions.hidePositionSearchResults());
            }

            // perform position search, if no map item clicked and no position search results active and no overlay active
            if (!action.dataItem && !searchState.positionSearchState.clickPos && !flightMapState.showMapOverlay.dataItem && !flightMapState.showNotamPopup && !flightMapState.showTrafficPopup) {
                returnActions.push(SearchActions.searchByPosition({
                    clickPos: action.clickPos,
                    zoom: action.zoom
                }));
            }

            return returnActions;
        })
    ));

    // endregion


    // region map overlay

    showOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightMapActions.showOverlay),
        withLatestFrom(this.notamState$),
        switchMap(([action, notamState]) => combineLatest([
            of(action),
            this.getOverlayDataItem$(action.dataItem),
            this.flightMapStateService.findWaypointsByPos$(action.dataItem?.getPosition()),
            this.getOverlayNotams$(action, notamState),
            this.getOverlayMetarTafs$(action.dataItem),
        ]).pipe(take(1))),
        map(([action, overlayDataItem, waypoints, notams, metarTaf]) => FlightMapActions.showOverlaySuccess({
            waypoints: waypoints,
            dataItem: overlayDataItem,
            clickPos: action.clickPos,
            metarTaf: metarTaf,
            notams: notams,
            tabIndex: this.getOverlayTabIndex(action.dataItem),
        }))
    ));


    hideOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.flightMapState$),
        filter(([action, flightMapState]) => flightMapState.showMapOverlay.dataItem !== undefined),
        map(() => FlightMapActions.hideOverlay())
    ));


    hideOverlay2Action$ = createEffect(() => this.actions$.pipe(
        ofType(
            AirportChartActions.openAirportChart,
            AirportChartActions.deleteAirportChartSuccess,
            WaypointActions.insert,
            WaypointActions.delete,
            WaypointActions.update,
            WaypointActions.setAlternate
        ),
        map(action => FlightMapActions.hideOverlay())
    ));


    private getOverlayDataItem$(dataItem: DataItem): Observable<DataItem> {
        if (dataItem.dataItemType === DataItemType.airport) {
            return this.airportService.readAirportById((dataItem as ShortAirport).id);
        }

        if (dataItem.dataItemType === DataItemType.metarTaf) {
            return this.airportService.readAirportByIcao((dataItem as MetarTaf).ad_icao);
        }

        if (dataItem.dataItemType === DataItemType.waypoint) {
            return this.flightMapStateService.findDataItemByPos$(dataItem.getPosition()).pipe(
                switchMap(od => {
                    if (!od) {
                        return of(dataItem);
                    } else if (od.dataItemType === DataItemType.airport) {
                        return this.airportService.readAirportById((od as ShortAirport).id);
                    } else {
                        return of(od);
                    }
                })
            );
        }

        return of(dataItem);
    }


    private getOverlayNotams$(
        action: { dataItem: DataItem, clickPos: Position2d},
        notamState: NotamState
    ): Observable<Notam[]> {
        if (action.dataItem.dataItemType === DataItemType.airport) {
            return this.notamService.readByIcao(
                (action.dataItem as ShortAirport).icao,
                notamState.minStartTimestamp,
                notamState.maxEndTimestamp
            );
        }

        if (action.clickPos) {
            return this.notamService.readByPosition(
                action.clickPos,
                notamState.minStartTimestamp,
                notamState.maxEndTimestamp
            );
        }

        return of(undefined);
    }


    private getOverlayMetarTafs$(dataItem: DataItem): Observable<MetarTaf> {
        if (dataItem.dataItemType === DataItemType.airport && (dataItem as ShortAirport).icao) {
            return this.flightMapStateService.findMetarTafByIcao$((dataItem as ShortAirport).icao);
        }

        if (dataItem.dataItemType === DataItemType.metarTaf) {
            return of(dataItem as MetarTaf);
        }

        return of(undefined);
    }


    private getOverlayTabIndex(dataItem: DataItem): number {
        if (dataItem.dataItemType === DataItemType.metarTaf) {
            return 3;
        }

        return 0;
    }

    // endregion
}
