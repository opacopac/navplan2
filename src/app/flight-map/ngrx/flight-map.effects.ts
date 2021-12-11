import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {debounceTime, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {combineLatest, Observable, of, pipe} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';
import {DataItem, DataItemType} from '../../common/model/data-item';
import {FlightMapActions} from './flight-map.actions';
import {getFlightMapState} from './flight-map.selectors';
import {SearchActions} from '../../search/ngrx/search.actions';
import {getSearchState} from '../../search/ngrx/search.selectors';
import {IDate} from '../../system/domain-service/date/i-date';
import {SystemConfig} from '../../system/domain-service/system-config';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {MetarTafActions} from '../../flight-map-metar-taf/ngrx/metar-taf.actions';
import {AirportActions} from '../../aerodrome-state/ngrx/airport/airport.actions';
import {AirportCircuitActions} from '../../aerodrome-state/ngrx/airport-circuit/airport-circuit.actions';
import {ReportingPointSectorActions} from '../../aerodrome-state/ngrx/reporting-point-sector/reporting-point-sector.actions';
import {AirspaceActions} from '../../enroute-state/ngrx/airspace/airspace.actions';
import {NavaidActions} from '../../enroute-state/ngrx/navaid/navaid.actions';
import {NotamActions} from '../../notam-state/ngrx/notam.actions';
import {WebcamActions} from '../../webcam-state/ngrx/webcam.actions';
import {MeteoSmaActions} from '../../meteo-sma-state/ngrx/meteo-sma.actions';
import {TrafficActions} from '../../traffic/ngrx/traffic.actions';
import {Notam} from '../../notam/domain-model/notam';
import {ShortAirport} from '../../aerodrome/domain-model/short-airport';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Webcam} from '../../webcam/domain-model/webcam';
import {AirportChartActions} from '../../aerodrome-state/ngrx/airport-chart/airport-chart.actions';
import {AirportChart} from '../../aerodrome/domain-model/airport-chart';
import {ISearchRepo} from '../../search/domain-service/i-search-repo';
import {FlightMapStateService} from './flight-map-state.service';
import {WaypointActions} from '../../flightroute-state/ngrx/waypoints.actions';
import {IAirportService} from '../../aerodrome/domain-service/i-airport.service';
import {INotamService} from '../../notam/domain-service/i-notam.service';


@Injectable()
export class FlightMapEffects {
    private readonly date: IDate;
    private readonly flightMapState$ = this.appStore.select(pipe(getFlightMapState));
    private readonly searchState$ = this.appStore.select(pipe(getSearchState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: IAirportService,
        private readonly notamService: INotamService,
        private readonly searchRepo: ISearchRepo,
        private readonly flightMapStateService: FlightMapStateService,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    // region map moved/clicked

    mapMovedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(100),
        switchMap(action => [
            AirportActions.update({ extent: action.extent, zoom: action.zoom }),
            AirportCircuitActions.update({ extent: action.extent, zoom: action.zoom }),
            ReportingPointSectorActions.update({ extent: action.extent, zoom: action.zoom }),
            AirspaceActions.update({ extent: action.extent, zoom: action.zoom }),
            NavaidActions.update({ extent: action.extent, zoom: action.zoom }),
            MetarTafActions.update({ extent: action.extent, zoom: action.zoom }),
            NotamActions.update({ extent: action.extent, zoom: action.zoom }),
            WebcamActions.update({ extent: action.extent, zoom: action.zoom }),
            MeteoSmaActions.update({ extent: action.extent, zoom: action.zoom }),
            TrafficActions.updateExtent({ extent: action.extent, zoom: action.zoom }),
        ])
    ));


    mapClickedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.flightMapState$, this.searchState$),
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
            if (flightMapState.showOverlay.dataItem && !action.dataItem) {
                returnActions.push(FlightMapActions.hideOverlay());
            }

            // close position search results, if previously open
            if (searchState.positionSearchState.clickPos) {
                returnActions.push(SearchActions.hidePositionSearchResults());
            }

            // perform position search, if no map item clicked and no position search results active and no overlay active
            if (!action.dataItem && !searchState.positionSearchState.clickPos && !flightMapState.showOverlay.dataItem) {
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
        switchMap(action => combineLatest([
            of(action),
            this.getOverlayDataItem$(action.dataItem),
            this.flightMapStateService.findWaypointsByPos$(action.dataItem?.getPosition()),
            this.getOverlayNotams$(action),
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
        filter(([action, flightMapState]) => flightMapState.showOverlay.dataItem !== undefined),
        map(() => FlightMapActions.hideOverlay())
    ));


    hideOverlay2Action$ = createEffect(() => this.actions$.pipe(
        ofType(
            AirportChartActions.openAirportChart,
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


    private getOverlayNotams$(action: { dataItem: DataItem, clickPos: Position2d }): Observable<Notam[]> {
        if (action.dataItem.dataItemType === DataItemType.airport) {
            return this.notamService.readByIcao(
                (action.dataItem as ShortAirport).icao,
                this.date.getDayStartTimestamp(0),
                this.date.getDayEndTimestamp(2)
            );
        }

        if (action.clickPos) {
            return this.notamService.readByPosition(
                action.clickPos,
                this.date.getDayStartTimestamp(0),
                this.date.getDayEndTimestamp(2)
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
