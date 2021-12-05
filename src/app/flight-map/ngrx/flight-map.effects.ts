import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {debounceTime, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {combineLatest, Observable, of, pipe} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';
import {DataItem, DataItemType} from '../../common/model/data-item';
import {FlightMapActions} from './flight-map.actions';
import {getFlightMapState} from './flight-map.selectors';
import {SearchActions} from '../../search/ngrx/search.actions';
import {getSearchState} from '../../search/ngrx/search.selectors';
import {INotamRepo} from '../../notam/domain-service/i-notam-repo';
import {IDate} from '../../system/domain-service/date/i-date';
import {SystemConfig} from '../../system/domain-service/system-config';
import {OlGeometry} from '../../base-map/ol-model/ol-geometry';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {MetarTafState} from '../../metar-taf/domain-model/metar-taf-state';
import {getMetarTafState} from '../../metar-taf/ngrx/metar-taf.selectors';
import {IAirportRepo} from '../../aerodrome/domain-service/i-airport-repo';
import {MetarTafActions} from '../../metar-taf/ngrx/metar-taf.actions';
import {AirportActions} from '../../aerodrome/ngrx/airport/airport.actions';
import {AirportCircuitActions} from '../../aerodrome/ngrx/airport-circuit/airport-circuit.actions';
import {ReportingPointSectorActions} from '../../aerodrome/ngrx/reporting-point-sector/reporting-point-sector.actions';
import {AirspaceActions} from '../../enroute/ngrx/airspace/airspace.actions';
import {NavaidActions} from '../../enroute/ngrx/navaid/navaid.actions';
import {NotamActions} from '../../notam/ngrx/notam.actions';
import {WebcamActions} from '../../webcam/ngrx/webcam.actions';
import {MeteoSmaActions} from '../../meteo-sma/ngrx/meteo-sma.actions';
import {TrafficActions} from '../../traffic/ngrx/traffic.actions';
import {Notam} from '../../notam/domain-model/notam';
import {ShortAirport} from '../../aerodrome/domain-model/short-airport';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';


@Injectable()
export class FlightMapEffects {
    private readonly date: IDate;
    private readonly flightMapState$ = this.appStore.select(pipe(getFlightMapState));
    private readonly searchState$ = this.appStore.select(pipe(getSearchState));
    private readonly metarTafState$ = this.appStore.pipe(select(getMetarTafState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportRepo: IAirportRepo,
        private readonly notamRepo: INotamRepo,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    // region map moved / clicked

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
                        returnActions.push(FlightMapActions.showOverlay({
                            dataItem: action.dataItem,
                            clickPos: action.clickPos,
                        }));
                        break;
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

            // perform position search, if no map item clicked or no position search results active
            if (!action.dataItem && !searchState.positionSearchState.clickPos) {
                returnActions.push(FlightMapActions.searchByPosition({ position: action.clickPos }));
            }

            return returnActions;
        })
    ));

    // todo: webcam click => see webcam effects
    // todo: chart close click => see chart effects

    // endregion


    // region map overlay

    showOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightMapActions.showOverlay),
        withLatestFrom(this.metarTafState$),
        switchMap(([action, metarTafState]) => combineLatest([
            of(action),
            this.getOverlayDataItem$(action.dataItem),
            this.getOverlayNotams$(action),
            this.getOverlayMetarTafs$(action.dataItem, metarTafState),
        ]).pipe(take(1))),
        map(([action, overlayDataItem, notams, metarTaf]) => FlightMapActions.showOverlaySuccess({
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


    // endregion


    // region position search

    searchByPositionAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem === undefined),
        withLatestFrom(this.flightMapState$, this.searchState$),
        filter(([action, flightMapState, searchState]) => {
            return !flightMapState.showOverlay.dataItem && !searchState.positionSearchState.clickPos;
        }),
        map(([action, flightMapState, searchState]) => {
            return SearchActions.searchByPosition({
                clickPos: action.clickPos,
                maxDegRadius: OlGeometry.calcDegPerPixelByZoom(action.zoom) * 50,
                minNotamTimestamp: 0,
                maxNotamTimestamp: 999 // TODO
            });
        })
    ));

    hidePositionSearchResultsAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.searchState$),
        filter(([action, searchState]) => searchState.positionSearchState.clickPos !== undefined),
        map(() => SearchActions.hidePositionSearchResults())
    ));

    // endregion


    private getOverlayDataItem$(dataItem: DataItem): Observable<DataItem> {
        if (dataItem.dataItemType === DataItemType.airport) {
            return this.airportRepo.readAirportById((dataItem as ShortAirport).id);
        }

        if (dataItem.dataItemType === DataItemType.metarTaf) {
            return this.airportRepo.readAirportByIcao((dataItem as MetarTaf).ad_icao);
        }

        return of(dataItem);
    }


    private getOverlayNotams$(action: { dataItem: DataItem, clickPos: Position2d }): Observable<Notam[]> {
        if (action.dataItem.dataItemType === DataItemType.airport) {
            return this.notamRepo.readByIcao(
                (action.dataItem as ShortAirport).icao,
                this.date.getDayStartTimestamp(0),
                this.date.getDayEndTimestamp(2)
            );
        }

        if (action.clickPos) {
            return this.notamRepo.readByPosition(
                action.clickPos,
                this.date.getDayStartTimestamp(0),
                this.date.getDayEndTimestamp(2)
            );
        }

        return of(undefined);
    }


    private getOverlayMetarTafs$(dataItem: DataItem, metarTafState: MetarTafState): Observable<MetarTaf> {
        if (dataItem.dataItemType === DataItemType.airport && (dataItem as ShortAirport).icao) {
            const results = metarTafState.metarTafs.filter(metarTaf => metarTaf.ad_icao === (dataItem as ShortAirport).icao);
            return of(results.length > 0 ? results[0] : undefined);
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
}
